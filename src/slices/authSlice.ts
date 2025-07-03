import { createSlice } from '@reduxjs/toolkit'

interface User {
  username:string;
}

interface AuthState {
  isLoggedIn: boolean
  user: User | null
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  isLoggedIn : !!localStorage.getItem('user') 
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
      state.isLoggedIn = true
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout(state) {
      state.isLoggedIn = false
      state.user = null
      localStorage.removeItem('user');
    },
  },
})

export const { logout,setUser } = authSlice.actions
export default authSlice.reducer
