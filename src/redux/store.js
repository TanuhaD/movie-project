import { configureStore } from "@reduxjs/toolkit";
import { moviesReducer } from "./moviesSlice";
import { userReducer } from "./users/userSlice";

export const store = configureStore({
  reducer: {
    moviesStore: moviesReducer,
    userStore: userReducer,
  },
});
