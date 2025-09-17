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
    updateProfileSuccess(state, action) {
      // fusionne les nouvelles infos avec les infos existantes
      state.user = {
        ...state.user,     // garde les autres champs (email, createdAt, etc.)
        ...action.payload, // écrase seulement ce qui a changé (userName, firstName, lastName)
      };
    },
  },
});

export const { loginSuccess, logout, updateProfileSuccess } = userSlice.actions;
export default userSlice.reducer;
