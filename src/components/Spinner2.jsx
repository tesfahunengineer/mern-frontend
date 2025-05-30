import PropTypes from "prop-types";

const Spinner = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-4",
    lg: "w-10 h-10 border-4",
  };

  return (
    <div
      className={`border-t-2 border-blue-500 rounded-full animate-spin ${sizeClasses[size]}`}
    ></div>
  );
};
Spinner.propTypes = {
  size: PropTypes.string.isRequired,
};
export default Spinner;
