import PropTypes from "prop-types"; // Import PropTypes

function Button({ title }) {
  return <button>{title}</button>;
}

// Correcting prop validation to use propTypes
Button.propTypes = {
  title: PropTypes.string.isRequired, // Ensures title is a string and required
};

export default Button;
