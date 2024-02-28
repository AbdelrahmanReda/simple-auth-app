import React from "react";

interface FlexRowCardProps {
  className?: string;
  children: React.ReactNode;
}

const FCol: React.FC<FlexRowCardProps> = ({ children, className }) => {
  return <div className={`${className} flex-col flex`}>{children}</div>;
};

export default FCol;
