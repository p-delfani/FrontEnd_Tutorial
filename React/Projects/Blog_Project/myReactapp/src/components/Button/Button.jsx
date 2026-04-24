import React from "react";

function Button({ primary, label }) {
  console.log(primary);

  return (
    <button
      className={primary && "btn primary-btn"}
      style={{
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "6px",
        margin: "10px",
        cursor: "pointer",
        backgroundColor: primary ? "blue" : "gray",
      }}
    >
      {label ? label : primary ? "Primary Button" : "Default Button"}
    </button>
  );
}

export default Button;
