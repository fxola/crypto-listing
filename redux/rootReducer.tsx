import { combineReducers } from "@reduxjs/toolkit";
import { listingsSlice } from "../features/Listings/index.slice";

const rootReducer = combineReducers({
  listings: listingsSlice.reducer
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
