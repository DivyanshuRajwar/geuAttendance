import React, { useState, useContext,useEffect,useRef } from "react";
import { Search, Mic, Moon, Sun, Bell, Settings } from "lucide-react";
import Male from "../Assets/user_Male.png";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function TopBar() {
  const [isDark, setIsDark] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click happened outside of the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = (e)=>{
    e.preventDefault();
    logout();
    navigate('/');
  }
  return (
    <div className="w-full h-[11vh] flex items-center bg-[#CFE9D0]  pl-[1.25rem]">
      <div className="w-1/2 h-[70%] flex gap-[1.25rem] items-center">
        <div className="flex items-center bg-[#FCFCFC] w-[20rem] h-full rounded-full pl-[1.5rem] gap-[1rem]">
          <Search />
          <input type="text" placeholder="Search..." />
        </div>
        <div className="w-[2.8125rem] h-[2.8125rem] bg-[#FCFCFC] flex items-center justify-center rounded-full">
          <Mic />
        </div>
      </div>
      <div className="w-1/2 h-[70%] flex gap-[1.25rem] items-center">
        <div className="w-[2.8125rem] h-[2.8125rem] bg-[#FCFCFC] flex items-center justify-center rounded-full">
          <div onClick={toggleTheme} className="cursor-pointer">
            {isDark ? <Moon color="#000" /> : <Sun color="#000" />}
          </div>
        </div>
        <div className="w-[2.8125rem] h-[2.8125rem] bg-[#FCFCFC] flex items-center justify-center rounded-full">
          <Bell />
        </div>
        {/* Settings icon with dropdown */}
        <div className="relative">
          <div
            className="w-[2.8125rem] h-[2.8125rem] bg-[#FCFCFC] flex items-center justify-center rounded-full cursor-pointer"
            onClick={toggleDropdown}
          >
            <Settings />
          </div>
          {isDropdownOpen && (
            <div ref={dropdownRef}  className="dropdown absolute top-full right-0 mt-2 w-[10rem] bg-white shadow-md rounded-lg z-10">
              <ul className="flex flex-col">
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => alert("Edit Profile clicked")}
                >
                  Edit Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className=" h-full min-w-[10rem] bg-[#FCFCFC] flex items-center justify-between rounded-full ml-[14rem] px-4 relative ">
          {/* Username */}
          <div className=" min-w-[4rem]   text-right  absolute left-3 ">
            <span>{user ? user.firstName : "Guest"}</span>
          </div>

          {/* User Image */}
          <div className=" ml-3 absolute right-0   ">
            <img
              src={Male}
              alt="pic"
              className="w-[3.2rem] h-[3.2rem] rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
