import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,   
  token: null, 
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
      state.user = {
        ...state.user,     
        ...action.payload,
      };
    },
  },
});

export const { loginSuccess, logout, updateProfileSuccess } = userSlice.actions;
export default userSlice.reducer;
