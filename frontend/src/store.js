import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import UserDetailsReducer from "./redux/UserDetails";


export const store = configureStore({
  reducer: {
    userDetails:UserDetailsReducer
  },
});

setupListeners(store.dispatch);