// components/SignUpDialog.tsx
import { useSelector } from 'react-redux';
import SignUp from './SignUp'
import { RootState } from '../../../store/store';

export default function SignUpDialog() {
    const { showSignUpDialog } = useSelector((state: RootState) => state.authDialog)


  if (!showSignUpDialog) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 ">
        <SignUp />
    </div>
  )
}
