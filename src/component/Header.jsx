import Input from "./Input";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogOutBtn from "./LogOutBtn";
import { useState } from "react";


function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [searchTerm,setSearchTerm] = useState("")

  const navItem = [
    {
      name: "WatchList",
      path: "/watchlist",
      active: !authStatus,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      path: "/signup",
      active: !authStatus,
    },
  ];

  const handleSearch = () => {
    if(searchTerm.trim() !== ""){
      navigate(`/search/${searchTerm}`)
    }
  }

  return (
    <header className="bg-gradient-to-r bg-blue-950 shadow-md h-16 fixed top-0 w-full z-50">
      <nav className="flex items-center justify-between px-6 md:px-20 h-16 w-full">
        
        <h1 
          className="text-white text-2xl font-bold cursor-pointer hover:scale-105 transition"
          onClick={() => navigate("/")}
        >
          MoviePulse
        </h1>

        <div className="relative w-[18rem] sm:w-[25rem] md:w-[35rem] flex items-center">
          <Input 
            className="w-full pl-10 pr-3 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Search movies..."
            value = {searchTerm}
            onChange = {(e) => setSearchTerm(e.target.value) }
            onKeyPress = {(e) => e.key === 'Enter' && handleSearch()}
          /> 
        </div>

        <ul className="flex items-center space-x-4">
          {navItem.map(
            (items) =>
              items.active && (
                <li key={items.name}>
                  <button
                    onClick={() => navigate(items.path)}
                    className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold shadow-md transition duration-200 hover:bg-blue-700 hover:text-white"
                  >
                    {items.name}
                  </button>
                </li>
              )
          )}

          {authStatus && (
            <li>
              <LogOutBtn />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
