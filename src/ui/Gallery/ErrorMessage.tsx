import React from "react";

export const ErrorMessage: React.FC = () => (
  <p
    data-testid="error-message"
    style={{
      position: "fixed",
      top: "0",
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: "16px",
      color: "white",
      backgroundColor: "red",
      padding: "8px",
    }}
  >
    Error loading images. Please try again.
  </p>
);
