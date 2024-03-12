type InputFieldProps = {
  type: string;
  placeholder: string;
  required?: boolean;
  width?: string;
  height?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  required = false,
  width = "w-full",
  height = "h-10",
  className = "",
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      className={`inline-block px-2 text-sm border border-gray-400 border-solid rounded ${width} ${height} ${className}`}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputField;
