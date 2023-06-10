import React from "react";

export default function BirdProperties({product}) {
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
            <span>Gender: <span style={{fontSize: '2rem', color: '#272727'}}>{product.gender}</span></span>
         </div>
         <div style={headlineContainerStyle}>
            <span style={dotStyle}></span>
            <span>Color: <span style={{fontSize: '2rem', color: '#272727'}}>{product.color}</span></span>
         </div>
         <div style={headlineContainerStyle}>
            <span style={dotStyle}></span>
            <span>Specie: <span style={{fontSize: '2rem', color: '#272727'}}>{product.specie}</span></span>
         </div>
         <div style={headlineContainerStyle}>
            <span style={dotStyle}></span>
            <span>Age: <span style={{fontSize: '2rem', color: '#272727'}}>{product.age}</span></span>
         </div>
      </div>
   );
}
