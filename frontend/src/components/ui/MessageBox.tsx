import React from "react";

type Props = {
  variant?: "success" | "danger" | "info";
};

const MessageBox: React.FC<Props> = ({ children, variant = "info" }) => {
  return <div className={`alert alert-${variant}`}>{children}</div>;
};

export default MessageBox;
