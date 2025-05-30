import PropTypes from "prop-types";

export function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full text-white bg-blue-600 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
    >
      {label}
    </button>
  );
}

// Prop types validation
Button.propTypes = {
  label: PropTypes.string.isRequired, // Ensure `label` is a string and is required
  onClick: PropTypes.func.isRequired, // Ensure `onClick` is a function and is required
};
