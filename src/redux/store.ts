import { configureStore } from "@reduxjs/toolkit";
import characterLengthReducer from "./slices/characterLengthSlice.ts";

export const store = configureStore({
  reducer: {
    characterLength: characterLengthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
