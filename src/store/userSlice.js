import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      token: null,
      email: null,
      userId: null
    },
    showForm: false
  },
  reducers: {
    setUser: ((state, { payload }) => {
      state.user.token = payload.token;
      state.user.email = payload.email;
      state.user.userId = payload.userId;
    }),
    removeUser: ((state) => {
      state.user.token = null;
      state.user.email = null;
      state.user.userId = null;
    }),
    toggleForm: ((state, { payload }) => {
      state.showForm = payload;
    })
  }
})

export const { setUser, removeUser, toggleForm } = userSlice.actions;
export default userSlice.reducer;