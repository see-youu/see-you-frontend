import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  bgColor: string;
  textColor?: string;
};
const SocialLoginButton: React.FC<Props> = ({
  children,
  bgColor,
  textColor = "text-white",
}) => {
  return (
    <div
      className={`flex items-center justify-center h-10 ${bgColor} ${textColor} rounded w-60 cursor-pointer`}
    >
      {children}
    </div>
  );
};

export default SocialLoginButton;
