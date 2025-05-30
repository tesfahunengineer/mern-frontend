import PropTypes from "prop-types";

const FormInput = ({
  inputLabel,
  labelFor,
  inputType,
  inputId,
  inputName,
  placeholderText,
  ariaLabelName,
  value, // ✅ add this
  onChange, // ✅ and this
}) => {
  return (
    <div className="font-general-regular mb-4">
      <label
        className="mb-1 block text-lg text-primary-dark dark:text-primary-light"
        htmlFor={labelFor}
      >
        {inputLabel}
      </label>
      <input
        className="w-full px-5 py-2 text-md border border-opacity-50 border-gray-300 dark:border-gray-600 text-primary-dark dark:text-white bg-ternary-light dark:bg-gray-800 rounded-md shadow-sm"
        type={inputType}
        id={inputId}
        name={inputName}
        placeholder={placeholderText}
        aria-label={ariaLabelName}
        value={value} // ✅ bind the value
        onChange={onChange} // ✅ handle the change
        required
      />
    </div>
  );
};

FormInput.propTypes = {
  inputLabel: PropTypes.string.isRequired,
  labelFor: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  placeholderText: PropTypes.string,
  ariaLabelName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired, // ✅ validate value
  onChange: PropTypes.func.isRequired, // ✅ validate onChange
};

export default FormInput;
