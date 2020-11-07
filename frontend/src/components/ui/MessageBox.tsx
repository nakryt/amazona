import React from "react";

type Props = {
  variant?: "success" | "danger" | "info";
  style?: object;
};

const MessageBox: React.FC<Props> = ({ children, variant = "info", style }) => {
  return (
    <div className={`alert alert-${variant}`} style={style}>
      {children}
    </div>
  );
};

export default MessageBox;
