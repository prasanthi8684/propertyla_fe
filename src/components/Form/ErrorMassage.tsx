import React from "react";

interface ErrorType {
  message: string | undefined;
}

const ErrorMessage = ({ message }: ErrorType) => {
  return (
    <div style={{ color: "#5758d6", textAlign: "start", fontSize: "14px" }}>
      {message}
    </div>
  );
};

export default ErrorMessage;
