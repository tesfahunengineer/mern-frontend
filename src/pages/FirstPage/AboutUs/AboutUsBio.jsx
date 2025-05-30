import profileImage from "../../../assets/logo.jpg";
import newImage from "../../../assets/newImage.jpg";
import { useContext } from "react";
import { motion } from "framer-motion";
import AboutMeContext from "./AboutMeContext";

const AboutUsBio = () => {
  const { aboutMe } = useContext(AboutMeContext);

  return (
    <div className="block sm:flex sm:gap-10 mt-10 sm:mt-20 ">
      {/* Column containing both images */}
      <div className="w-full sm:w-1/4 mb-7 sm:mb-0">
        {/* Profile Image with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }} // Start off-screen (left)
          whileInView={{ opacity: 1, x: 0 }} // Animate when in view
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }} // Runs once per page load
          whileHover={{ scale: 1.2, x: 10, y: -5 }}
        >
          <img
            src={profileImage}
            className="w-full max-w-xs sm:max-w-sm max-h-72 rounded-lg shadow-lg ml-4 sm:ml-0"
            alt="Profile"
          />
        </motion.div>

        {/* New Image with Different Height */}
        <motion.div
          initial={{ opacity: 0, x: -50 }} // Animation settings
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.2, x: 10, y: -5 }}
        >
          <img
            src={newImage}
            className="w-full max-w-xs sm:max-w-sm h-[300px] rounded-lg shadow-lg ml-4 sm:ml-0 pt-3" // Height increased here
            alt="New Image"
          />
        </motion.div>
      </div>

      {/* Bio Section */}
      <div className="font-serif w-full sm:w-3/4 text-left text-gray-800 dark:text-gray-100">
        <div className="text-[18px] sm:text-[18px] leading-relaxed tracking-wide font-normal sm:font-medium p-4 mb-6">
          {aboutMe.map((bio, index) => (
            <motion.p
              key={bio.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="mb-4"
            >
              {bio.bio}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsBio;
