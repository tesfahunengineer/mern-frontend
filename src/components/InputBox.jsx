import PropTypes from "prop-types";

export function InputBox({ label, placeholder, onChange, type }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2 text-blue-500">
        {label}
      </div>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200"
      />
    </div>
  );
}

// Prop validation
InputBox.propTypes = {
  label: PropTypes.string.isRequired, // label should be a string and is required
  placeholder: PropTypes.string, // placeholder should be a string, but not required
  onChange: PropTypes.func.isRequired, // onChange should be a function and is required
  type: PropTypes.string.isRequired, // type should be a string and is required
};
