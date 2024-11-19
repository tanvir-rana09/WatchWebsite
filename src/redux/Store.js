// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; // Uses localStorage
import { combineReducers } from "redux";
import cartReducer from "./Slice";

// Redux Persist Configuration
const persistConfig = {
    key: "root", // Key to access in storage
    storage, // Type of storage (localStorage or sessionStorage)
    whitelist: ["cart"], // Reducers to persist
};

// Combine reducers
const rootReducer = combineReducers({
    cart: cartReducer,
    // Add other reducers here
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Redux Persist actions are non-serializable, so we disable this check
        }),
});

// Persistor
const persistor = persistStore(store);

export { store, persistor };
