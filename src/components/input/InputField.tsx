type InputFieldProps = {
  type: string;
  placeholder: string;
  required?: boolean;
  width?: string;
  height?: string;
  className?: string;
};
const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  required = false,
  width = "w-full",
  height = "h-10",
  className = "",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      className={`inline-block px-2 text-sm border border-gray-400 border-solid rounded ${width} ${height} ${className}`}
    />
  );
};

export default InputField;
