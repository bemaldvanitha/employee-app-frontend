import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "@/slicers/apiSlice";

const store = configureStore({
   reducer: {
       [apiSlice.reducerPath]: apiSlice.reducer
   },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export default store;