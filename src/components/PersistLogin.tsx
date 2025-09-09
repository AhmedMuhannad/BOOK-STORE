import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import AuthContext from "../context/AutrhProvider";
const PersistLogin = () => {
  const { auth } = useContext(AuthContext)!;
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);
  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
  }, [isLoading]);
  return <>{!isLoading ? <Outlet /> : <p>Loading...</p>}</>;
  //   return;
};

export default PersistLogin;
