
import React from "react";

function Bird({className}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      className={className}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 25.445l27.908 5.49 5.317 4.372m2.36-1.561l-2.36 1.561-3.299 2.183M20.588 10.51l-5.669 3.232.032.85-1.894 1.462 2.81.46v4.648l2.433 2.989 3.85 3.617 8.03-.778 1.261.025L43.5 33.869l-10.136-8.186 3.892.396-2.83-2.459 4.303-.268-17.499-9.563zm.547 16.43l-.83 1.49m5.435-.896l-1.246 1.664"
      ></path>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M29.068 20.312l-7.715-.26-.501-3.858z"
      ></path>
    </svg>
  );
}

export default Bird;
