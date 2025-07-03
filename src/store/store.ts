import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import uiReducer from '../slices/uiSlice'
import postReducer from '../slices/postSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    authDialog: uiReducer,
    posts: postReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
