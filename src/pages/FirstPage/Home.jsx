import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import { FiArrowDownCircle } from "react-icons/fi";
import developerLight from "../../assets/image4.jpg";
import developerDark from "../../assets/image4.jpg";
import { motion } from "framer-motion";
import AboutUs from "./AboutUs/AboutUs";
import ContactUs from "./ContactUs/ContactUs";
import Footer from "./Footer/Footer";
import OurService from "./OurService/OurService";
import document from "../../files/yekassadocuments.pdf";

const Home = () => {
  const [activeTheme] = useThemeSwitcher();

  return (
    <section className="w-full min-h-screen  pt-24 overflow-x-hidden px-4 sm:px-16 py-8 bg-white dark:bg-gray-900 shadow-md">
      {/* Content Wrapper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="flex flex-col sm:flex-row flex-wrap items-center justify-between py-12 min-h-[450px]"
      >
        {/* Left Section (Text) */}
        <div className="w-full sm:w-1/2 text-center sm:text-left">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.9, delay: 0.1 }}
            className="font-bold text-2xl md:text-3xl lg:text-4xl text-gray-900 dark:text-gray-100 uppercase"
          >
            arki digital software!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
            className="font-serif font-medium mt-3 text-lg md:text-xl text-gray-700 dark:text-gray-300"
          >
            Welcome! this is yekassa general contractor official website with arki digital software embedded in it, You can download
            the document below and view our service and products, And you can contact with us.Feels
            Free!!
          </motion.p>

          {/* Download Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.9, delay: 0.3 }}
            className="mt-5 flex justify-center sm:justify-start"
          >
            <a
              download="yekassadocuments.pdf"
              href={document}
              className="flex items-center px-4 py-2 rounded-lg shadow-md border border-indigo-300 dark:border-gray-600 bg-indigo-50 dark:bg-gray-800 hover:bg-indigo-500 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 hover:text-white transition duration-500"
              aria-label="Download Document"
            >
              <FiArrowDownCircle className="mr-2 sm:mr-3 h-5 w-5" />
              <span className="text-sm sm:text-base font-medium">
                Documents
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right Section (Image) */}
        <div className="w-full sm:w-1/2 flex justify-center mt-6 sm:mt-0">
          <motion.img
            src={activeTheme === "dark" ? developerDark : developerLight}
            alt="Developer"
            className="w-full max-w-xs sm:max-w-sm max-h-72 rounded-lg shadow-lg"
            whileHover={{ scale: 1.2, x: 10, y: -5 }} // Hover effect that increases size and slightly moves the image
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </motion.div>
      <AboutUs />
      <OurService />
      <ContactUs />
      <Footer />
    </section>
  );
};

export default Home;
