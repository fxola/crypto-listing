import { useEffect, useRef } from "react";
import { batch } from "react-redux";
import ReconnectingWebSocket from "reconnecting-websocket";
import {
  setBooks,
  setTicker,
  setTrades,
  fetchTicker,
  updateTrades,
  fetchBooks,
  fetchTrades
} from "../features/Listings/index.slice";
import { useAppDispatch } from "./useReduxActions";

const onConnect = (socket: ReconnectingWebSocket) => {
  let tradesSub = JSON.stringify({
    event: "subscribe",
    channel: "trades",
    symbol: "tBTCUSD"
  });

  let tickerSub = JSON.stringify({
    event: "subscribe",
    channel: "ticker",
    symbol: "tBTCUSD"
  });

  let booksSub = JSON.stringify({
    event: "subscribe",
    channel: "book",
    symbol: "tBTCUSD",
    length: 20
  });

  socket.send(tradesSub);
  socket.send(tickerSub);
  socket.send(booksSub);
};

const channelMap = {
  ticker: null,
  book: null,
  trades: null
};

interface Prop {
  connected: boolean;
}

export const useWebSockets = ({ connected }: Prop) => {
  const dispatch = useAppDispatch();
  const ref = useRef<ReconnectingWebSocket>();

  const disconnect = () => {
    ref.current?.close();
  };

  useEffect(() => {
    if (!connected) {
      return;
    }
    const socket = new ReconnectingWebSocket(
      () => "wss://api-pub.bitfinex.com/ws/2"
    );

    socket.addEventListener("open", () => {
      batch(() => {
        dispatch(fetchTrades());
        dispatch(fetchTicker());
        dispatch(fetchBooks());
      });

      onConnect(socket);
    });

    socket.addEventListener("message", message => {
      const data = JSON.parse(message.data);

      if (data.event === "info") return;

      if (data.event === "subscribed") {
        //@ts-ignore
        channelMap[data.channel] = data.chanId;
        return;
      }

      if (data[0] == channelMap.ticker) {
        dispatch(setTicker(data[1]));
      }

      if (data[0] == channelMap.trades) {
        if (data.length < 3 && Array.isArray(data[1])) {
          dispatch(setTrades(data[1]));
        } else if (data[1] == "te") {
          dispatch(updateTrades(data[2]));
        }
      }

      if (data[0] == channelMap.book) {
        if (data[1].length > 1 && Array.isArray(data[1][0])) {
          dispatch(setBooks(data[1]));
        } else {
          // console.log({ data });
        }
      }
    });
    socket.addEventListener("close", () => {
      console.log("closing");
    });

    ref.current = socket;

    return () => disconnect();
  }, [connected]);

  return {
    disconnect
  };
};
