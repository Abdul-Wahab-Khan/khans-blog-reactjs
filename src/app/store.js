import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import counterReducer from '../components/counterSlice'
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: defaulMiddleware => defaulMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)