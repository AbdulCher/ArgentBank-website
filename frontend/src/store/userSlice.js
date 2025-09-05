import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,   // pas d’utilisateur connecté au départ
  token: null,  // token JWT si connecté
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
