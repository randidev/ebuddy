import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "./storage";
import { rootReducer } from "./rootReducer";


const persistConfig = {
  key: "ebuddy",
  storage,
  blacklist: [""],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, undefined, AnyAction>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { persistor, store };
