import { createSlice } from "@reduxjs/toolkit";

export const authStore = createSlice({
  name: "auth",
  initialState :{
    user : null,
  },
  reducers: {
    signin : (state, action) => {
      state.user = action.payload
    },
  }
})

export const {signin} = authStore.actions

export default authStore.reducer

export const selectAuthUser = state => state.auth.user