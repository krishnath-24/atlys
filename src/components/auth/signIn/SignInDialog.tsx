import React from 'react';
import SignIn from './SignIn'
  import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

export default function SignInDialog() {

  const { showSignInDialog } = useSelector((state: RootState) => state.authDialog)


  if (!showSignInDialog) return null;

  return <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <SignIn />
    </div>
}
