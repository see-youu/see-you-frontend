import React from "react";

type InputSectionProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

const InputSection: React.FC<InputSectionProps> = ({
  label,
  children,
  className,
}) => {
  return (
    <section className={`flex flex-col gap-1 ${className}`}>
      <span className="text-sm">{label}</span>
      {children}
    </section>
  );
};

export default InputSection;
