import { configureStore } from "@reduxjs/toolkit";
import characterLengthReducer from "./slices/characterLengthSlice.ts";
import securityLevelReducer from "./slices/securityLevelSlice.ts";

export const store = configureStore({
  reducer: {
    characterLength: characterLengthReducer,
    securityLevel: securityLevelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
