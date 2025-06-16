import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const handleSignIn = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div className="relative h-screen w-full">
      {/* Header */}
      <Header />

      {/* Background image + black overlay */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover scale-105"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/7968847f-3da9-44b3-8bbb-13a46579881f/web/IN-en-20250609-TRIFECTA-perspective_32b70b51-20d4-46db-8a1a-3d5428be5f0e_small.jpg"
          alt="background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Centered Login Form */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <form className="w-3/12 flex flex-col bg-black/80  text-white p-10 rounded-lg">
          <h1 className="text-2xl font-bold mb-6">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          {/* //conditional rendering for sing up and sign in */}
          {!isSignIn && (
            <input
              className="p-4 mb-4 border border-gray-700 rounded-sm bg-gray-800 text-white placeholder-gray-400"
              type="text"
              placeholder="Enter Full Name"
            />
          )}
          <input
            className="p-4 mb-4 border border-gray-700 rounded-sm bg-gray-800 text-white placeholder-gray-400"
            type="email"
            placeholder="Enter Email"
          />
          <input
            className="p-4 mb-4 border border-gray-700 rounded-sm bg-gray-800 text-white placeholder-gray-400"
            type="password"
            placeholder="Enter Password"
          />
          <button
            className="p-4 mb-4 bg-red-600 hover:bg-red-700 rounded-sm"
            type="submit"
          >
            Login
          </button>

          <p className="text-center text-sm mb-4">OR</p>
          <button
            className="p-4 mb-4 bg-gray-700 hover:bg-gray-600 rounded-sm"
            type="button"
          >
            Use a Sign-in Code
          </button>

          <a
            href="#"
            className="underline text-sm mb-4 text-blue-400 hover:text-blue-500 text-center"
          >
            Forgot Password?
          </a>

          <div className="text-sm space-y-2">
            <label className="inline-flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="mr-2"
              />
              Remember Me
            </label>

            <p>
              {isSignIn ? "New to Netflix? " : "Already a member "}

              <a
                href="#"
                className="underline text-blue-400"
                onClick={handleSignIn}
              >
                {isSignIn ? "Sign up now" : "Sign In "}
              </a>
            </p>
            <p className="text-xs">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.{" "}
              <a href="#" className="underline text-blue-400">
                Learn more.
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
