import React, {useState} from 'react';
import { LogIn } from 'lucide-react';
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../../slices/authSlice';
import { closeSignInDialog, openSignUpDialog} from '../../../slices/uiSlice';
import { RootState } from '../../../store/store';
import { isTestAccount } from '../../../utils/common';
import {debounce as _debounce} from 'lodash';
import type { SignInFormType } from '../../../types/auth.types';
import Spinner from '../../Spinner';


function SignIn() {

  const {showSignInDialog} = useSelector((state: RootState) => state.authDialog);

  const [formData, setFormData] = useState<SignInFormType>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch()


  const handleSignUp = () => {
    if(!showSignInDialog) {
      navigate('/signup');
      return;
    }
    else {      
      dispatch(openSignUpDialog())
      dispatch(closeSignInDialog())
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true);
    const { email: username, password } = formData;

    if (!username || !password) {
      toast.error('Please enter both email and password',{
          position: 'top-center'
        })
      return
    }

    try {
      setTimeout(() => {
      if (
        isTestAccount(username, password)
      ) {
         dispatch(setUser({ username }))
        toast.success('Signed in successfully!', {
          position: 'top-center'
        })
        dispatch(closeSignInDialog())
        navigate('/feed')
      } else {
        toast.error('Invalid credentials. Please try again.',{
          position: 'top-center'
        })
      }
      setIsLoading(false);
    }, 500)
    } catch (error) {
      toast.error('Unable to Login!',{
          position: 'top-center'
      });
      setIsLoading(false);
    }
  }

  const handleFormUpdate = _debounce((name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, 100)

    return (
        <div className="bg-gray-200 select-none  p-2 relative flex flex-col items-center justify-center min-w-[430px] max-w-[600px] rounded-3xl">
          <div className="flex flex-col items-center bg-opacity-90 bg-white shadow-md py-8 px-5 w-full rounded-3xl ">
            <div className="flex flex-col items-center mb-8 w-[80%]">
              <div className="text-lg mb-3 p-2 bg-gray-100 text-gray-700 text-sm rounded-full text-center flex items-center justify-center"><LogIn size={24}/></div>
              <h2 className="text-lg font-semibold text-center">Sign in to continue</h2>
              <p className="text-xs text-gray-500 text-center mb-5 font-light">
                Sign in to access all the features on this app
              </p>
            </div>
    
            <form className="space-y-4 mb-5 w-[90%]">
              <div>
                <label className="block text-xs font-medium mb-1">Email or username</label>
                <input
                  aria-label='email or username'
                  id='email'
                  className="rounded-lg text-xs font-light w-full px-4 py-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  type="email"
                  name='email'
                  placeholder="Enter your email or username"
                  onChange={(e) => handleFormUpdate(e.target.name, e.target.value)}
                  required
                />
              </div>
    
              <div>
                <label className="block text-xs font-medium mb-1">Password</label>
                <input
                  aria-label='password'
                  className="rounded-lg   text-xs font-light w-full px-4 py-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  type="password"
                  name='password'
                  placeholder="Enter your password"
                  minLength={8}
                  onChange={(e) => handleFormUpdate(e.target.name, e.target.value)}
                  required
                />
              </div>
    
              <button
                aria-label='sign in'
                type="submit"
                className="rounded-lg flex gap-2 items-center justify-center w-full bg-indigo-500 text-sm text-white py-3 font-normal hover:bg-indigo-700 transition"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Sign In {isLoading && <Spinner />}
              </button>
            </form>
           
          </div>
            <div  className="my-3 border-none  text-center text-sm text-gray-500">
              Do not have an account?{" "}
              <a onClick={handleSignUp} aria-label='sign up' className="text-indigo-600 hover:underline font-medium cursor-pointer">
                Sign Up
              </a>
            </div>
        </div>
      )
}

export default SignIn