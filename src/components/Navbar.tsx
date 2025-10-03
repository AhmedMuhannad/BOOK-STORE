import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import { IoLogOutOutline } from "react-icons/io5";
import { IoLogInOutline } from "react-icons/io5";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AutrhProvider";
import { useContext } from "react";
import { getBooks } from "../api/booksApi";
import { logoutUser } from "../api/userApi";
import { setAvatar } from "../features/ProfileSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function NavBar() {
  const Avatar = useSelector((state: RootState) => state.ProfileSlice.Avatar);
  const [data, setData] = React.useState([]);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/" },
    { name: "Contact", path: "/contactus" },
    { name: "Cart", path: "/cart" },
  ];
  async function getSearchedBooks(search: string) {
    const res = await getBooks(search);
    setData(res.data);
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
  function handleAuthClick(): void {
    if (auth) {
      // User is logged in - handle logout
      logOutFunction();
      setAuth(undefined);
      navigate("/"); // Clear auth state
      // You might also want to clear cookies/localStorage here
      console.log("User logged out");
    } else {
      navigate("/login");
    }
  }

  function handleChange(e) {
    setInputValue(e.target.value);
    getSearchedBooks(inputValue);
    console.log(data);
  }

  const { auth, setAuth } = useContext(AuthContext)!;
  const navigate = useNavigate();
  function handleClickLogin(): void {
    if (auth) {
      navigate("/");
    }
  }

  const ref = React.useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(""); //this one is for input focus to control the width of the input, search about onFocus and onBlur in react 😄
  React.useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        setIsScrolled((ref.current as HTMLDivElement).scrollTop > 10);
      }
    };
    if (ref.current) {
      ref.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  console.log(data);
  return (
    <nav
      className={`sticky  bg-secondary w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500  ${
        isScrolled
          ? "bg-background/80 shadow-md text-text backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6"
      }`}
    >
      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8 mr-4">
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className="group flex flex-col gap-0.5 text-text"
          >
            {link.name}
            <div className="bg-accent h-0.5 w-0 group-hover:w-full transition-all duration-300" />
          </a>
        ))}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center ml- gap-4">
        <div className="relative flex items-center border pl-3 gap-2 bg-background border-primary/30 rounded-md max-w-md w-full h-[60px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 30 30"
            className="text-text"
          >
            <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
          </svg>
          <div className="w-full h-[40px] pl-4">
            <input
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={inputValue}
              onChange={(e) => {
                handleChange(e);
              }}
              type="text"
              placeholder="Search for products"
              className="w-[200px] h-full outline-none text-text transition-all duration-600 placeholder-text/70 text-sm bg-background"
            />
            {data.books && inputValue && (
              <div className="absolute w-full h-[200px] overflow-y-scroll p-1 top-full left-0 right-0 bg-background border border-primary/20 shadow-lg">
                {data.books.map((book) => {
                  return (
                    <div
                      className="flex gap-4 py-4 items-center hover:bg-secondary/50 cursor-pointer"
                      key={book._id}
                      onClick={() => {
                        setInputValue("");
                        console.log(book._id);
                        navigate(`/${book._id}/Details`, {
                          state: { item: book._id },
                        });
                      }}
                    >
                      <img className="h-[120px]" src={book.coverImage} alt="" />{" "}
                      <h1 className="line-clamp-1 text-text">{book.title}</h1>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {auth ? (
          <img
            className="h-15 w-15 rounded-full ml-4 hover:cursor-pointer "
            src={Avatar}
            alt="userImage1"
            onClick={() => {
              navigate("/Settings");
            }}
          />
        ) : (
          <p></p>
        )}
        {!auth ? (
          <button
            className="bg-primary text-background px-8 py-2.5 rounded-full transition-all duration-500 flex flex-row justify-between items-center gap-2 hover:bg-primary/90"
            onClick={() => {
              handleAuthClick();
            }}
          >
            Login
            <IoLogInOutline />
          </button>
        ) : (
          <p></p>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center justify-between w-full gap-3 md:hidden">
        <svg
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="h-6 w-6 cursor-pointer text-text"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
        <div className="relative ml-auto flex items-center border pl-3 gap-2 bg-background border-primary/30 rounded-md max-w-md w-2/3 h-[40px]">
          <svg
            className="absolute text-text"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 30 30"
          >
            <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
          </svg>
          <div className="w-full h-[40px] pl-4">
            <input
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={inputValue}
              onChange={(e) => {
                handleChange(e);
              }}
              type="text"
              placeholder="Search for products"
              className="w-[200px] h-full outline-none text-text transition-all duration-600 placeholder-text/70 text-sm ml-2 bg-background"
            />
            {data.books && inputValue && (
              <div className="absolute w-full h-[200px] overflow-y-scroll p-1 top-full left-0 right-0 bg-background border border-primary/20 shadow-lg">
                {data.books.map((book) => {
                  return (
                    <div
                      className="flex gap-4 py-4 items-center hover:bg-secondary/50 cursor-pointer"
                      key={book._id}
                      onClick={() => {
                        setInputValue("");
                        console.log(book._id);
                        navigate(`/${book._id}/Details`, {
                          state: { item: book._id },
                        });
                      }}
                    >
                      <img className="h-[120px]" src={book.coverImage} alt="" />{" "}
                      <h1 className="line-clamp-1 text-text">{book.title}</h1>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-background text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-text transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-text"
          title="menu"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <img
          className="h-15 w-15 rounded-full hover:cursor-pointer"
          src={Avatar}
          alt="userImage1"
          onClick={() => {
            navigate("/Profile");
          }}
        />
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="text-text hover:text-accent"
          >
            {link.name}
          </a>
        ))}

        <button
          className="bg-primary text-background px-8 py-2.5 rounded-full transition-all duration-500 flex flex-row justify-between items-center gap-2 hover:bg-primary/90"
          onClick={() => {
            handleAuthClick();
          }}
        >
          {!auth ? "Login" : ""}
          {!auth ? <IoLogInOutline /> : <p></p>}
        </button>
      </div>
    </nav>
  );
}
