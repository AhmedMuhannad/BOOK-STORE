import { createContext, useState, Dispatch, SetStateAction } from "react";

type AuthContextType = {
  auth: any;
  setAuth: Dispatch<SetStateAction<any>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<any>(null);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
