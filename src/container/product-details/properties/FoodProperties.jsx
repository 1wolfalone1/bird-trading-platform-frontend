import React from "react";

export default function FoodProperties({ product }) {
  const dotStyle = {
    display: "inline-block",
    width: "0.8rem",
    height: "0.8rem",
    borderRadius: "50%",
    backgroundColor: "black",
    marginRight: "1rem",
    marginLeft: "1rem",
    verticalAlign: "middle",
  };

  const headlineContainerStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: "2.4rem",
  };

  return (
    <div>
      <div style={headlineContainerStyle}>
        <span style={dotStyle}></span>
        <span>
          Weight:{" "}
          <span
            style={{
              fontSize: "2.4rem",
              color: "rgb(96, 25, 131)",
              fontWeight: "bold",
            }}
          >
            {product.weight.toLocaleString({ minimumFractionDigits: 0 })}g
          </span>
        </span>
      </div>
    </div>
  );
}
