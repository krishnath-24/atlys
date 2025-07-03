import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom"
import Feed from "../components/feed/Feed"
import SignUp from "../components/auth/signUp/SignUp"
import SignIn from "../components/auth/signIn/SignIn"

function Wrapper({children} : {children: React.ReactNode}): React.ReactElement {
  return <div className="flex items-center justify-center w-full h-[80vh]">
    {children}
  </div>
}

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/feed" replace />} />
        <Route path="/login" element={<Wrapper>
          <SignIn />
        </Wrapper>} />
        <Route path="/signup" element={
      <Wrapper>
          <SignUp />
        </Wrapper>} />
        <Route path="/feed" element={<Feed />} />
        <Route path="*" element={<div className="p-4 text-center">
            <h1>404 Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">Go to Home</Link>
        </div>} />
      </Routes>
  )
}
