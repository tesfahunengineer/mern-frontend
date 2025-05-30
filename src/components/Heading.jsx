import PropTypes from "prop-types"; // Import PropTypes

export function Heading({ label, color }) {
  return <div className={`font-bold text-4xl pt-5 ${color}`}>{label}</div>;
}

// Prop types validation
Heading.propTypes = {
  label: PropTypes.string.isRequired, // `label` should be a string and is required
  color: PropTypes.string.isRequired, // `color` should be a string and is required
};
