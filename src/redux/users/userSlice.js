import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    token: "",
    uid: "",
  },
  reducers: {
    saveUserData: (state, { payload: { name, email, token, uid } }) => {
      state.name = name;
      state.email = email;
      state.token = token;
      state.uid = uid;
    },
  },
});
export const userReducer = userSlice.reducer;
export const { saveUserData } = userSlice.actions;
