import { useState } from "react";

type InputFieldProps = {
  type: string;
  placeholder: string;
  required?: boolean;
  width?: string;
  height?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
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
  onBlur,
  error,
  errorMessage,
}) => {
  return (
    <section className="flex flex-col">
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className={`inline-block px-2 text-sm border border-gray-400 border-solid rounded ${width} ${height} ${className} ${
          error ? "border-red-500 border-2" : "border-gray-400"
        } `}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <span className="text-sm text-red-600">{errorMessage}</span>}
    </section>
  );
};

export default InputField;
