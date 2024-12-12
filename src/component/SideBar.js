import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../Assets/Main_logo.png";
import {
    User,
    ChevronRight,
    NotebookPen,
    ListChecks,
    FileText,
  } from "lucide-react";
function SideBar() {
const [activeOption, setActiveOption] = useState('Profile');
const [activeRoute, setActiveRoute] = useState('/Profile');
const navigate = useNavigate();

// Options data
const options = [
    { label: 'Profile', icon: <User />, color: '#45AA40' },
    { label: 'Attendance', icon: <NotebookPen />, color: '#45AA40' },
    { label: 'View Att.', icon: <ListChecks />, color: '#45AA40' },
    { label: 'Document', icon: <FileText />, color: '#45AA40' },
];

const optionRoutes = {
    Profile: '/profile',
    Attendance: '/attendance',
    'View Att.': '/view-attendance',
    Document: '/document'
};

useEffect(()=>{
    navigate(activeRoute);
},[activeOption])
const handleOptionClick = (option) => {
    setActiveOption(option.label);
    const route = optionRoutes[option.label];
    if (route) {
        setActiveRoute(route);
    }
};
return (
    <div className="w-[18%] h-screen bg-[#F2E9E0] flex flex-col gap-[2.8rem] items-center pt-[0.75rem]">
      <img src={Logo} alt="logo" className="w-[6.5rem] h-[6.5rem]" />
      <div className="flex flex-col space-y-[2rem]">
        {options.map((option) => (
          <div
            key={option.label}
            className={`rounded-full w-[16rem] h-[4.375rem] flex items-center pl-[1.25rem] pr-[0.5rem] shadow-lg relative cursor-pointer 
                    ${
                      activeOption === option.label
                        ? "bg-[#45AA40]"
                        : "bg-white"
                    }`}
            onClick={() => handleOptionClick(option)}
          >
            <div className="flex items-center">
              {React.cloneElement(option.icon, {
                color: activeOption === option.label ? "#fff" : option.color,
                className: "w-[1.875rem] h-[1.875rem]",
              })}
            </div>
            <span
              className={`text-[1.6875rem] ml-[0.5rem] 
                        ${
                          activeOption === option.label
                            ? "text-white"
                            : "text-black"
                        }`}
            >
              {option.label}
            </span>
            <div
              className="flex items-center absolute right-[1rem]"
              style={{ width: "1.875rem" }}
            >
              <ChevronRight
                color={activeOption === option.label ? "#fff" : option.color}
                className="w-[1.875rem] h-[1.875rem]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
