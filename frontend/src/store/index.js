import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer, // on pourra ajouter d’autres slices plus tard
  },
});

export default store;
