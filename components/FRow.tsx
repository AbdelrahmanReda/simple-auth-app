import React from "react";

interface FlexRowCardProps {
  className?: string;
  children: React.ReactNode;
}

const FRow: React.FC<FlexRowCardProps> = ({ children, className }) => {
  return (
    <div className={`${className} flex gap-1 items-center`}>{children}</div>
  );
};

export default FRow;
