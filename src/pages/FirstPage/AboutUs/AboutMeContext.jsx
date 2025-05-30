import { useState, createContext } from "react";
import { aboutMeData } from "./AboutMeData";
import PropTypes from "prop-types";

const AboutMeContext = createContext();

export const AboutMeProvider = ({ children }) => {
  const [aboutMe, setAboutMe] = useState(aboutMeData);

  return (
    <AboutMeContext.Provider
      value={{
        aboutMe,
        setAboutMe,
      }}
    >
      {children}
    </AboutMeContext.Provider>
  );
};

// Move propTypes validation to AboutMeProvider
AboutMeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AboutMeContext;
