import { motion } from "framer-motion";
import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import NavBar from "../../NavBar";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";

const ContactUs = () => {
  const location = useLocation();
  // Check if the current route is the 'ContactUs' page
  const showFooter = location.pathname === "/contactus";
  return (
    <>
      <NavBar />
      <div className="bg-white dark:bg-gray-900 min-h-screen mt-10 sm:mt-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.5,
            delay: 0.1,
          }}
          className="container mx-auto flex flex-col-reverse lg:flex-row py-5 lg:py-10 lg:mt-10 text-gray-900 dark:text-gray-100"
        >
          <ContactForm />
          <ContactDetails />
        </motion.div>
        {/* Conditionally render the footer */}
        {showFooter && <Footer />}
      </div>
    </>
  );
};

export default ContactUs;
