import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./reducers";

function saveToLocalStorage(store) {
  try {
    const serializedStore = JSON.stringify(store);
    window.localStorage.setItem("store", serializedStore);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedStore = window.localStorage.getItem("store");
    if (serializedStore === null) return undefined;
    return JSON.parse(serializedStore);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: Reducer,
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(/* any additional middleware here */),
  devTools: process.env.NODE_ENV !== 'production', // Enables Redux DevTools in development
});

store.subscribe(() => saveToLocalStorage(store.getState()));
