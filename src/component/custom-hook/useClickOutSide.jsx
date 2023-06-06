import { useEffect } from "react";
import { useRef } from "react";

export default function useClickOutSide(callback) {
   const ref = useRef();

   useEffect(() => {
      const handleClick = (event) => {
         if (ref.current && !ref.current.contains(event.target)) {
            console.log(ref, event.target, "----------");
            callback();
         }
      };

      document.addEventListener("click", handleClick);

      return () => {
         document.removeEventListener("click", handleClick);
      };
   }, [ref]);

   return ref;
}
