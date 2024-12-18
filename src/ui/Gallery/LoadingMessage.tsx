import React from "react";

export const LoadingMessage: React.FC = () => (
  <p
    data-testid="loading-message"
    style={{
      position: "fixed",
      top: "0",
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: "16px",
      backgroundColor: "red",
      padding: "8px",
    }}
  >
    Loading more images...
  </p>
);
