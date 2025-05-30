import PropTypes from "prop-types";

export function SubHeading({ label }) {
  return <div className="text-slate-500 text-md pt-1 px-4 pb-4">{label}</div>;
}

// Prop validation
SubHeading.propTypes = {
  label: PropTypes.string.isRequired, // label should be a string and is required
};
