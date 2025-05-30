import AboutUsBio from "./AboutUsBio";
import { AboutMeProvider } from "./AboutMeContext";
import { motion } from "framer-motion";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";
import NavBar from "../../NavBar";

const AboutUs = () => {
  const location = useLocation();
  // Check if the current route is the 'AboutUs' page
  const showFooter = location.pathname === "/aboutus";
  return (
    <>
      <NavBar />
      <AboutMeProvider>
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col mt-10 sm:mt-0 ">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, delay: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto flex-grow"
          >
            <AboutUsBio />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, delay: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, delay: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto"
          >
            {/* <AboutClients /> */}
          </motion.div>
          {/* Conditionally render the footer */}
          {showFooter && <Footer />}
        </div>
      </AboutMeProvider>
    </>
  );
};

export default AboutUs;
