import React, { useState } from "react";
import { LogIn } from "lucide-react";
import { openSignInDialog, closeSignUpDialog } from "../../../slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import { setUser } from "../../../slices/authSlice";
import {debounce as _debounce} from 'lodash';
import { RootState } from "../../../store/store";
import type { SignUpFormType } from "../../../types/auth.types";
import Spinner from "../../Spinner";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {showSignUpDialog} = useSelector((state: RootState) => state.authDialog);

  const [formData, setFormData] = useState<SignUpFormType>({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange =  _debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, 250);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password, repeatPassword } = formData;

    if (!email || !password || !repeatPassword) {
      toast.error("All fields are required",{
          position: 'top-right'
        });
      return;
    }

    if (password !== repeatPassword) {
      toast.error("Passwords do not match",{
        position: 'top-right'
      });
      return;
    }
    setIsLoading(true)
    const user = { username: email };

    try {
      setTimeout(() => {
        dispatch(setUser(user)); 
        dispatch(closeSignUpDialog());
        toast.success("Account created successfully",{
          position: 'top-right'
        });
        navigate("/feed");
        setIsLoading(false)
    },500)
    } catch (error) {
      toast.error("Failed to create account. Please try again.",{
        position: 'top-right'
      });
    }
  };

  const handleSignIn = () => {
    if(showSignUpDialog) {
       dispatch(openSignInDialog());
       dispatch(closeSignUpDialog());
    } else {
      navigate('/login');
      return;
    }
  };

  return (
    <div className="select-none bg-gray-200 p-2 relative flex flex-col items-center justify-center min-w-[430px] max-w-[600px] rounded-3xl">
      <div className="flex flex-col items-center bg-opacity-90 bg-white shadow-md py-8 px-5 w-full rounded-3xl">
        <div className="flex flex-col items-center mb-6 ">
          <div className="text-lg mb-3 p-2 bg-gray-100 text-gray-600 text-sm rounded-full text-center flex items-center justify-center">
            <LogIn size={18} />
          </div>
          <h2 className="text-lg font-semibold text-center">
            Create an account to continue
          </h2>
          <p className="text-xs text-gray-500 text-center mb-5 font-light">
            Create an account to access all the features on this app
          </p>
        </div>

        <form className="space-y-4 w-[90%]" onSubmit={handleSignUp}>
          <div>
            <label className="block text-xs font-medium mb-1">
              Email or username
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email or username"
              className="rounded-lg text-xs font-light w-full px-4 py-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              minLength={8}
              placeholder="Enter your password"
              className="rounded-lg text-xs font-light w-full px-4 py-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">
              Repeat password
            </label>
            <input
              type="password"
              name="repeatPassword"
              minLength={8}
              onChange={handleChange}
              placeholder="Enter your password again"
              className="rounded-lg text-xs font-light w-full px-4 py-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="flex gap-2 items-center justify-center rounded-lg w-full bg-indigo-500 text-sm text-white py-3 font-normal hover:bg-indigo-700 transition"
          >
            Sign Up {isLoading && <Spinner />}
          </button>
        </form>
      </div>

      <div className="my-3 border-none text-center text-sm text-gray-500">
        Already have an account?{" "}
        <a
          onClick={handleSignIn}
          aria-label="sign in"
          className=" text-indigo-600 text-sm hover:underline font-medium cursor-pointer"
        >
          Sign In 
        </a>
      </div>
    </div>
  );
}
