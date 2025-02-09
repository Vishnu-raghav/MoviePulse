import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import LogOutBtn from "./LogOutBtn";
import Login from "./Login";
import Signup from "./Signup";
import Input from "./Input";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "WatchList", path: "/watchlist", active: authStatus },
    { name: "Login", onClick: () => setIsLoginOpen(true), active: !authStatus },
    {
      name: "SignUp",
      onClick: () => setIsSignUpOpen(true),
      active: !authStatus,
    },
  ];

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <>
      <header className="bg-blue-950 text-white fixed top-0 w-full z-50 shadow-lg">
        <nav className="flex items-center justify-between px-4 sm:px-10 lg:px-20 h-16">
          <h1
            className="text-2xl font-bold cursor-pointer hover:scale-105 transition"
            onClick={() => navigate("/")}
          >
            MoviePulse
          </h1>

          <div className="flex w-40 sm:w-64 md:w-80 relative">
            <Input
              className="w-full pl-10 pr-3 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500 text-lg" />
          </div>

          <ul className="hidden md:flex items-center space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={
                        item.onClick ? item.onClick : () => navigate(item.path)
                      }
                      className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold shadow-md transition duration-200 hover:bg-blue-700 hover:text-white"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && <LogOutBtn />}
          </ul>

          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-blue-900 shadow-lg flex flex-col items-center p-4 space-y-4">
            <ul className="flex flex-col items-center space-y-4">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          item.onClick ? item.onClick() : navigate(item.path);
                        }}
                        className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold shadow-md transition duration-200 hover:bg-blue-700 hover:text-white"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && <LogOutBtn />}
            </ul>
          </div>
        )}
      </header>

      {isLoginOpen && (
        <Login
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          switchToSignUp={() => {
            setIsLoginOpen(false);
            setIsSignUpOpen(true);
          }}
        />
      )}

      {isSignUpOpen && (
        <Signup
        isOpen={isSignUpOpen}
          onClose={() => setIsSignUpOpen(false)}
          switchToLogin={() => {
            setIsSignUpOpen(false);
            setIsLoginOpen(true);
          }}
        />
      )}
    </>
  );
}

export default Header;



