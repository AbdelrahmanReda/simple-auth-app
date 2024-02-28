import React, { ReactNode } from "react";

interface FFromWrapperProps {
  children: ReactNode;
  className?: string;
}

const FFromWrapper: React.FC<FFromWrapperProps> = ({
  children,

  className,
}) => (
  <div className={`my-1 flex flex-col gap-3 lg:my-3 ${className || ""}`}>
    {children}
  </div>
);

export default FFromWrapper;
