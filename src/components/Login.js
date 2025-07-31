import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidate } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice"; // Adjust the import path as necessary
import { USER_AVATAR } from "../utils/constant";
import { BACKGROUND_IMG } from "../utils/constant";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleValidate = (e) => {
    e.preventDefault(); // Stop default form submit
    const message = checkValidate(
      name.current?.value || "",
      email.current?.value || "",
      password.current?.value || "",
      isSignIn
    );
    setErrorMessage(message || "");

    if (message) {
      return;
    } // If there's an error, stop here

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + ":" + errorMessage);
        });
    } else {
      // Handle sign-in logic here
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + ":" + errorMessage);
        });
    }
  };
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
          src={BACKGROUND_IMG}
          alt="background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/50"></div>
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
              ref={name}
              className="p-4 mb-4 border border-gray-700 rounded-sm bg-gray-800 text-white placeholder-gray-400"
              type="text"
              placeholder="Enter Full Name"
            />
          )}
          <input
            ref={email}
            className="p-4 mb-4 border border-gray-700 rounded-sm bg-gray-800 text-white placeholder-gray-400"
            type="email"
            placeholder="Enter Email"
          />
          <input
            ref={password}
            className="p-4 mb-4 border border-gray-700 rounded-sm bg-gray-800 text-white placeholder-gray-400"
            type="password"
            placeholder="Enter Password"
          />
          <p className="font-bold text-red-500">{errorMessage}</p>
          <button
            className="p-4 mb-4 bg-red-600 hover:bg-red-700 rounded-sm"
            type="submit"
            onClick={handleValidate}
          >
            {isSignIn ? "Sign In" : "Sign Up"}
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
