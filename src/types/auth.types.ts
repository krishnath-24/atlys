import { Dispatch, SetStateAction } from 'react'


export interface AuthContextType {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
  showSignInDialog: boolean
  setShowSignInDialog: Dispatch<SetStateAction<boolean>>
  showSignUpDialog: boolean
  setShowSignUpDialog: Dispatch<SetStateAction<boolean>>
}