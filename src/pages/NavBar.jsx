import { useState, useEffect } from "react";
import {
  PaperAirplaneIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Set dark mode default to true
  const navigate = useNavigate();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode); // Apply dark mode to body element
  };

  useEffect(() => {
    // Apply dark mode on load if default is true
    if (darkMode) {
      document.body.classList.add("dark");
    }
  }, [darkMode]);

  return (
    <div className="app">
      <nav className="bg-gray-100 dark:bg-gray-800 fixed w-full top-0 left-0 z-50 shadow-md">
        {/* Set gray background here */}
        <div className="max-w-7xl mx-auto">
          <div className="flex mx-auto justify-between w-5/6 py-4">
            {/* Primary menu and logo */}
            <div className="flex items-center gap-16">
              {/* Logo */}
              <div>
                <a
                  href="/"
                  className=" flex gap-1 font-bold text-gray-700 dark:text-gray-100 items-center"
                >
                  <PaperAirplaneIcon className="h-6 w-6 text-primary" />
                  <span>YEKASSA</span>
                </a>
              </div>

              {/* Primary Links */}
              <div className="font-serif hidden lg:flex gap-8 ml-auto text-gray-700 dark:text-gray-100">
                <a
                  href="/signin"
                  className="hover:text-blue-600 transition-colors"
                >
                  SignIn
                </a>
                <a
                  href="/signup"
                  className="hover:text-blue-600 transition-colors"
                >
                  SignUp
                </a>
                <a
                  href="/ourservices"
                  className="hover:text-blue-600 transition-colors"
                >
                  Our Services
                </a>
                <a
                  href="/aboutus"
                  className="hover:text-blue-600 transition-colors"
                >
                  About Us
                </a>
                <a
                  href="/contactus"
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* Secondary Menu */}
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-10">
                {/* Dark Mode Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleTheme}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-all duration-200"
                  >
                    {darkMode ? (
                      <SunIcon className="h-6 w-6 cursor-pointer text-yellow-400" />
                    ) : (
                      <MoonIcon className="h-6 w-6 cursor-pointer text-gray-700 dark:text-gray-300" />
                    )}
                  </button>
                </div>

                {/* Free Trial Button */}
                <div>
                  <button
                    onClick={() => navigate("/")} // Navigates to FreeTrial component
                    className="rounded-full border-solid border-2 border-gray-300 py-2 px-4 text-gray-700 dark:text-gray-100 hover:bg-gray-700 hover:text-gray-100 dark:hover:bg-gray-500 dark:hover:text-gray-100 transition-all duration-200"
                  >
                    Free Trial
                  </button>
                </div>
              </div>

              {/* Mobile Navigation Toggle */}
              <div className="lg:hidden flex items-center">
                <button onClick={() => setToggleMenu(!toggleMenu)}>
                  <Bars3Icon className="h-6 w-6 cursor-pointer text-gray-700 dark:text-gray-100" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`fixed z-40 w-full bg-white dark:bg-gray-800 overflow-hidden flex flex-col gap-12 origin-top transition-all duration-700 ${
            toggleMenu ? "h-full" : "h-0"
          }`}
        >
          <div className="px-8 py-4">
            <div className="flex flex-col gap-8 font-bold tracking-wider text-gray-800 dark:text-gray-200">
              <a
                href="/signin"
                className="border-l-4 border-gray-600 hover:border-blue-500 transition-all"
              >
                SignIn
              </a>
              <a
                href="/signup"
                className="hover:text-blue-600 transition-colors"
              >
                SIgnUp
              </a>
              <a
                href="/aboutus"
                className="hover:text-blue-600 transition-colors"
              >
                About Us
              </a>
              <a
                href="/contactus"
                className="hover:text-blue-600 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
