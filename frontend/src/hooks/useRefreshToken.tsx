import React from "react";
import { getRefreshToken } from "../api/userApi";
import AuthContext from "../context/AutrhProvider";

const useRefreshToken = () => {
  const { setAuth } = React.useContext(AuthContext)!;
  const refresh = React.useCallback(async () => {
    try {
      const response = await getRefreshToken();
      setAuth((prev: any) => {
        console.log("Previous auth state:", prev);
        console.log("New token data:", response);
        return { ...prev, accessToken: response.accessToken };
      });
      return response;
    } catch (error) {
      console.error("Refresh token error:", error);
      throw error;
    }
  }, []);
  console.log(refresh);
  return refresh;
};

export default useRefreshToken;
