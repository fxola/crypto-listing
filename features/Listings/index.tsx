import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Button,
  SafeAreaView
} from "react-native";

import { useAppSelector } from "../../hooks/useReduxActions";
import { useWebSockets } from "../../hooks/useWebSockets";

//components
import Books from "../../components/Books";
import Ticker from "../../components/Ticker";
import Trades from "../../components/Trades";

const Listing = () => {
  const [connected, setConnected] = useState(true);

  const {
    books,
    booksLoading,
    booksError,
    ticker,
    trades,
    tickerLoading,
    tickerError,
    tradeLoading,
    tradesError
  } = useAppSelector(state => state.listings);

  const { disconnect } = useWebSockets({ connected });

  const toggleConnection = useCallback(() => {
    setConnected(!connected);
    connected && disconnect();
  }, [connected]);

  const renderTicker = () => {
    if (tickerLoading)
      return <ActivityIndicator size="small" color={"black"} />;
    if (!ticker.length) return <Text> No data available</Text>;
    if (tickerError) return <Text>Failed to load ticker</Text>;

    return <Ticker ticker={ticker} />;
  };

  const renderTrades = () => {
    if (tradeLoading) return <ActivityIndicator size="small" color={"black"} />;
    if (!trades.length) return <Text> No data available</Text>;
    if (tradesError) return <Text>Failed to load trades</Text>;

    return <Trades trades={trades} />;
  };

  const renderBooks = () => {
    if (booksLoading) return <ActivityIndicator size="small" color={"black"} />;
    if (!books.length) return <Text> No data available</Text>;
    if (booksError) return <Text>Failed to load trades</Text>;

    return <Books books={books} />;
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Button
        title={connected ? "Disconnect" : "Connect"}
        onPress={toggleConnection}
      ></Button>
      <View style={styles.section}>
        <Text style={styles.header}>Ticker</Text>
        {renderTicker()}
      </View>
      <View style={styles.section}>
        <Text style={styles.header}> Trades (BTC/USD)</Text>
        {renderTrades()}
      </View>
      <View style={styles.section}>
        <Text style={styles.header}> Order Books </Text>
        {renderBooks()}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingTop: 40,
    paddingHorizontal: 10
  },
  container: {
    flex: 1,
    marginHorizontal: 16
  },
  section: {
    marginBottom: 10
  },
  cell: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10
  },
  title: {
    fontSize: 17
  },
  firstTradeItem: { flex: 0.3 },
  tradeItem: {
    flex: 0.35,
    textAlign: "center"
  }
});

export default Listing;
