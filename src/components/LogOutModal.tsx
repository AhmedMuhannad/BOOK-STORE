import React from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AutrhProvider';
import { useContext } from 'react';
import { logoutUser } from '../api/userApi';
import { IoLogInOutline } from "react-icons/io5";

export default function LogOutModal() {
    const { auth, setAuth } = useContext(AuthContext)!;
    const navigate=useNavigate()
    function handleAuthClick(): void {
    if (auth) {
      // User is logged in - handle logout
      logOutFunction();
      setAuth(undefined);
      navigate("/"); 
    } 
  }
    const logOutFunction = async () => {
    try {
      const res = await logoutUser();
      console.log("Logout response:", res);
      return res;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };
    return (
        <div className="flex flex-col items-center bg-secondary shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-primary/20">
            <div className="flex items-center justify-center p-4 bg-accent/20 rounded-full text-3xl text-accent">
               <IoLogInOutline />
            </div>
            <h2 className="text-text font-semibold mt-4 text-xl">Are you sure?</h2>
            <p className="text-sm text-text/80 mt-2 text-center">
                Do you really want to continue? You'll need to<br />Login Again
            </p>
            <div className="flex items-center justify-center gap-4 mt-5 w-full">
                <button type="button" className="w-full md:w-36 h-10 rounded-md text-background bg-accent font-medium text-sm hover:bg-accent/90 active:scale-95 transition" onClick={handleAuthClick}>
                    Confirm
                </button>
            </div>
        </div>
    );
}