"use client";

import { Form, Label } from "@heroui/react";
import { useEffect, useRef, useState } from "react";


const Modes = [
    "Online",
    "Offline",
    "Both"
]


const SelectTeachingMode = ({value, onChange}) => {
  const [open, setOpen] = useState(false);
   const ref = useRef(null);
 
   useEffect(() => {
     const handleClick = (e) => {
       if (!ref.current?.contains(e.target)) setOpen(false);
     };
     document.addEventListener("mousedown", handleClick);
     return () => document.removeEventListener("mousedown", handleClick);
   }, []);
 
   return (
      <div ref={ref} className="relative w-full">
       <Label
         htmlFor="input-type-teaching-mode"
         className="font-sans text-[#70708E] text-base "
       >
         Teaching mode
       </Label>
 
       <button
         type="button"
         onClick={() => setOpen(!open)}
         className="w-full flex items-center justify-between border border-white/10 rounded-lg px-3 py-2 mt-1 text-white bg-[#191921] focus:outline-none cursor-pointer"
       >
         <span className={value ? "text-white" : "text-[#4c4b6b]"}>
           {value || "Select a mode"}
         </span>
         <svg
           className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
           fill="none"
           stroke="currentColor"
           viewBox="0 0 24 24"
         >
           <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth={2}
             d="M19 9l-7 7-7-7"
           />
         </svg>
       </button>
 
       {open && (
         <ul className="absolute z-50 w-full mt-1 bg-[#13131A] border border-white/15 rounded-lg shadow-xl overflow-hidden">
           {Modes.map((mode) => (
             <li
               key={mode}
               onClick={() => {
                 onChange(mode);
                 setOpen(false);
               }}
               className="px-3 py-2 cursor-pointer text-white hover:bg-[#0DBF82] hover:text-[#081A12] transition-colors duration-150"
             >
               {mode}
             </li>
           ))}
         </ul>
       )}
     </div>
   );
};

export default SelectTeachingMode;