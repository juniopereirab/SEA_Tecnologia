
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import companyReducer from "./reducers/company";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = {
  company: persistReducer(persistConfig, companyReducer),
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
