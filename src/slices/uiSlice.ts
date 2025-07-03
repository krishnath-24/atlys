import { createSlice } from '@reduxjs/toolkit'

interface UIState {
  showSignInDialog: boolean
  showSignUpDialog: boolean
}

const initialState: UIState = {
  showSignInDialog: false,
  showSignUpDialog: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openSignInDialog: (state) => {
      state.showSignInDialog = true
      state.showSignUpDialog = false
    },
    closeSignInDialog: (state) => {
      state.showSignInDialog = false
    },
    openSignUpDialog: (state) => {
      state.showSignUpDialog = true
      state.showSignInDialog = false
    },
    closeSignUpDialog: (state) => {
      state.showSignUpDialog = false
    },
  },
})

export const {
  openSignInDialog,
  closeSignInDialog,
  openSignUpDialog,
  closeSignUpDialog,
} = uiSlice.actions

export default uiSlice.reducer
