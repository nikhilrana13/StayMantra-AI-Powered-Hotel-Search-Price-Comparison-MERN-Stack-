
import React from "react";
import { NavLink } from "react-router-dom";
import { Heart, SearchIcon, UserCircle2, UserIcon } from "lucide-react";
import { useState } from "react";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <header className="flex items-center">
      <div className="flex max-w-screen-xl  mx-auto w-full">
        <div className="flex flex-wrap items-center justify-between w-full">
          {/* Logo */}
          <NavLink to="/" className="">
            <svg
              width="147"
              height="40"
              viewBox="0 0 147 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <style>{`
      .red { fill: #d9335f; }
      .orange { fill: #f28c28; }
      .blue { fill: #007cc3; }
      .text {
        font-family: 'Arial Rounded MT Bold', 'Nunito', sans-serif;
        font-size: 23px;
        font-weight: 800;
      }
    `}</style>
              <text x="0" y="30" className="text">
                <tspan className="red">stay</tspan>
                <tspan className="orange">man</tspan>
                <tspan className="blue">tra</tspan>
              </text>
            </svg>
          </NavLink>
          {/* Mobile Menu */}
          <div
            className={`lg:ml-6 lg:!block max-lg:fixed gap-5 max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 transition-transform duration-300 ${
              toggle ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={handleToggle}
              className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 fill-black"
                viewBox="0 0 320.591 320.591"
              >
                <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
                <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
              </svg>
            </button>
            {/* Menu Items */}
            <ul className="lg:flex items-center cursor-pointer lg:gap-x-3 max-lg:space-y-3">
              <li className="max-lg:border-b py-5 px-3 hover:bg-[#ffffff]">
                <NavLink to="/" className="">
                  <div className="flex gap-3 text-[#171717] items-center">
                    <Heart />
                    <span>Favorites</span>
                  </div>
                </NavLink>
              </li>
              <li className="max-lg:border-b py-5 px-3 hover:bg-[#ffffff]">
                <NavLink to="/login" className="">
                  <div className="flex items-center text-[#171717] gap-3">
                    <UserCircle2 />
                    <span>Log in</span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
          {/* Menu Toggle */}
          {/* Mobile Menu Button */}
          <button onClick={handleToggle} className="lg:hidden">
            <svg className="w-7 h-7" fill="#333" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
