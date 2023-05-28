

import React from "react";

function CartDown({className}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      className={className}
    >
      <g fill="#000" clipPath="url(#clip0_63_1797)">
        <path d="M10.5 30a2 2 0 100-4 2 2 0 000 4zM24.5 30a2 2 0 100-4 2 2 0 000 4zM5.48 2.804A1 1 0 004.5 2h-4v2h3.18l3.84 19.196A1 1 0 008.5 24h18v-2H9.32l-.8-4H26.5a1 1 0 00.976-.783L29.744 7h-2.047l-1.999 9H8.12L5.48 2.804z"></path>
        <path d="M22.086 6.586L18.5 10.172V2h-2v8.172l-3.586-3.586L11.5 8l6 6 6-6-1.414-1.414z"></path>
      </g>
      <defs>
        <clipPath id="clip0_63_1797">
          <path fill="#fff" d="M0 0H32V32H0z" transform="translate(.5)"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default CartDown;
