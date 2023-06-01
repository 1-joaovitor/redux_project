import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "user",
  initialState: {
    firstName: "",
    email: "",
    password: "",
    Logged: false,
  },
  reducers: {
    loginUser(state, { payload }) {
      return {
        ...state,
        firstName: payload.firstName,
        email: payload.email,
        password: payload.password,
        Logged: true,
      };
    },

    logout(state) {
      return { firstName: "", email: "", password: "", Logged: false };
    },
  },
});

export const { loginUser, logout } = slice.actions;
export default slice.reducer;
