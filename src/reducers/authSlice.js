import { createSlice } from '@reduxjs/toolkit'

const initialState = { authenticated: false, email: null }

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      return { ...state, email: action.payload, authenticated: true }
    },
    logout: () => {
      return { ...initialState }
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, } = authSlice.actions

export default authSlice.reducer