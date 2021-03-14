import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tradeLoading: false,
  booksLoading: false,
  tickerLoading: false,
  trades: [],
  ticker: [],
  books: [],
  tradesError: null,
  tickerError: null,
  booksError: null
};

export const listingsSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    fetchTrades: state => {
      state.tradeLoading = true;
    },
    setTrades: (state, action) => {
      state.trades = action.payload;
      state.tradeLoading = false;
    },
    updateTrades: (state, action) => {
      let newTrades = [action.payload, ...state.trades.slice(0, 20)];
      state.trades = newTrades;
    },
    fetchBooks: state => {
      state.booksLoading = true;
    },
    setBooks: (state, action) => {
      state.books = action.payload;
      state.booksLoading = false;
    },
    fetchTicker: state => {
      state.tickerLoading = true;
    },
    setTicker: (state, action) => {
      state.ticker = action.payload;
      state.tickerLoading = false;
    }
  }
});

export const {
  setTrades,
  setBooks,
  setTicker,
  fetchTicker,
  updateTrades,
  fetchTrades,
  fetchBooks
} = listingsSlice.actions;

export default listingsSlice.reducer;
