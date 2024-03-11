type SubmitButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  width?: string;
  height?: string;
  className?: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  onClick = () => {
    console.log("click");
  },
  width = "w-full",
  height = "h-10",
  className = "",
}) => {
  return (
    <button
      className={`px-3 text-sm rounded bg-customYellow ${width} ${height} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
