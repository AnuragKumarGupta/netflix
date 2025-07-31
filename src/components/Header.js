import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constant";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubscribe when function unmount
    return () => unsubscribe();
  }, []);
  return (
    <div className="w-screen absolute px-8 py-2 z-10 flex justify-between bg-gradient-to-b from-black">
      <img className="w-55" src={LOGO} alt="logo" />
      {user && (
        <div className="flex justify-between items-center">
          <h2 className="bg-red-500 w-20 h-10 font-bold text-white rounded-lg m-4 p-2">
            {user.displayName}
          </h2>
          <img
            className="w-15 h-15 m-2 rounded-full"
            src={user?.photoURL}
            alt="user"
          />
          <button
            onClick={handleSignOut}
            className="bg-red-500 w-20 h-10 font-bold text-white rounded-lg m-4 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
