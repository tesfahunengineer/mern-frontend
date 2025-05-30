import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiGlobe,
  FiYoutube,
} from "react-icons/fi";
import AppFooterCopyright from "./FooterCopyright";

const socialLinks = [
  { id: 1, icon: <FiGlobe />, url: "#" },
  { id: 2, icon: <FiGithub />, url: "#" },
  { id: 3, icon: <FiTwitter />, url: "#" },
  { id: 4, icon: <FiLinkedin />, url: "#" },
  { id: 5, icon: <FiYoutube />, url: "#" },
];

const AppFooter = () => {
  return (
    <footer className=" font-serif bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 mt-20">
      <div className="container mx-auto px-4 py-10 border-t border-gray-300 dark:border-gray-700">
        {/* Footer social links */}
        <div className="flex flex-col justify-center items-center mb-12">
          <p className="text-3xl sm:text-4xl font-semibold text-gray-800 dark:text-gray-300 mb-5">
            Follow Us
          </p>

          <ul className="flex gap-4 sm:gap-8">
            {socialLinks.map((link) => (
              <a
                href={link.url}
                target="__blank"
                key={link.id}
                className="flex justify-center items-center p-4 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-gray-300 dark:hover:bg-gray-700 shadow-sm transition-all duration-300"
              >
                <span className="text-2xl">{link.icon}</span>
              </a>
            ))}
          </ul>
        </div>

        <AppFooterCopyright />
      </div>
    </footer>
  );
};

export default AppFooter;
