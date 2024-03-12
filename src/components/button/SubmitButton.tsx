type SubmitButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  width?: string;
  height?: string;
  className?: string;
  disabled?: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  onClick = () => {
    console.log("click");
  },
  width = "w-full",
  height = "h-10",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      className={`px-3 text-sm rounded bg-customYellow ${width} ${height} ${className} ${
        disabled ? `bg-gray-300 cursor-not-allowed` : `bg-customYellow`
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
