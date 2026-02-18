import { configureStore } from "@reduxjs/toolkit";

import { productReducer } from "@/entities/product";
import { sessionReducer } from "@/entities/session";

export const store = configureStore({
  reducer: {
    products: productReducer,
    session: sessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
