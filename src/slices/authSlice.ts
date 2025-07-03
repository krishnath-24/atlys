import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  username:string;
  password:string;
}

interface AuthState {
  isLoggedIn: boolean
  user: User | null
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isLoggedIn = true
      state.user = action.payload
    },
    setUser(state, action) {
      state.user = action.payload
      state.isLoggedIn = true
    },
    logout(state) {
      state.isLoggedIn = false
      state.user = null
    },
  },
})

export const { login, logout,setUser } = authSlice.actions
export default authSlice.reducer
