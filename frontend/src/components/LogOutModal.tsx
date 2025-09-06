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
        <div className="flex flex-col  items-center bg-white shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-200">
            <div className="flex items-center justify-center p-4 bg-red-100 rounded-full text-3xl text-red-700">
               <IoLogInOutline />
            </div>
            <h2 className="text-gray-900 font-semibold mt-4 text-xl">Are you sure?</h2>
            <p className="text-sm text-gray-600 mt-2 text-center">
                Do you really want to continue? You'll need to<br />Login Again
            </p>
            <div className="flex items-center justify-center gap-4 mt-5 w-full">
                <button type="button" className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition" onClick={handleAuthClick}>
                    Confirm
                </button>
            </div>
        </div>
    );
}