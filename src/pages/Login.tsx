import React from "react";
import { useNavigate } from "react-router-dom";
import { postUser } from "../api/userApi";
import AuthContext from "../context/AutrhProvider";

interface UserInfo {
  email: string;
  password: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
}

export default function Login() {
  const { setAuth, auth } = React.useContext(AuthContext)!;

  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [userInfo, setUserInfo] = React.useState<UserInfo>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
  };

  async function checkAuth() {
    try {
      const res = await postUser(userInfo.email, userInfo.password);
      setUserData(res);
      return res;
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Please check your credentials.");
      return null;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = await checkAuth();
    setAuth(userData);
    if (userData) {
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <div className="bg-background text-text/80 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-text">
          Welcome back
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            id="email"
            className="w-full bg-background border my-3 border-primary/30 outline-none rounded-full py-2.5 px-4 text-text placeholder:text-text/50"
            type="email"
            placeholder="Enter your email"
            required
            onChange={handleChange}
            value={userInfo.email}
          />
          <input
            id="password"
            className="w-full bg-background border mt-1 border-primary/30 outline-none rounded-full py-2.5 px-4 text-text placeholder:text-text/50"
            type="password"
            placeholder="Enter your password"
            required
            onChange={handleChange}
            value={userInfo.password}
          />
          <div className="text-right py-4">
            <a className="text-primary underline" href="#">
              Forgot Password
            </a>
          </div>
          <button
            type="submit"
            className="w-full mb-3 bg-primary py-2.5 rounded-full text-background hover:bg-primary/90 transition"
          >
            Log in
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/SignUp" className="text-primary underline">
            Signup
          </a>
        </p>
        <button
          type="button"
          className="w-full flex items-center gap-2 justify-center mt-5 bg-text py-2.5 rounded-full text-background hover:bg-text/90 transition"
        >
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png"
            alt="appleLogo"
          />
          Log in with Apple
        </button>
        <button
          type="button"
          className="w-full flex items-center gap-2 justify-center my-3 bg-background border border-primary/30 py-2.5 rounded-full text-text hover:bg-secondary/30 transition"
        >
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
            alt="googleFavicon"
          />
          Log in with Google
        </button>
      </div>
    </div>
  );
}