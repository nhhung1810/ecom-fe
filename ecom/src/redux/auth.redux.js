import { createSlice } from "@reduxjs/toolkit";

export const authStore = createSlice({
  name: "auth",
  initialState :{
    user : null,
    remember : null,
  },
  reducers: {
    signin : (state, action) => {
      state.user = action.payload
    },

    signout : (state) => {
      state.user = null
      // state.remember = null
    },

    setRemember : (state, action) =>{
      state.remember = action.payload
    }   
  }
})

export const {signin, signout, setRemember} = authStore.actions

export default authStore.reducer

export const selectAuthUser = state => state.auth.user
export const selectRemember = state => state.auth.remember