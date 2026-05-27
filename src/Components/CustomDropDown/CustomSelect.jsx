"use client";
import { Label } from "@heroui/react";
import { useEffect, useRef, useState } from "react";

const subjects = [
  "All subjects",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
];
const modes = ["Mode", "Online", "Offline", "Both"];

const CustomSelect = ({ value, onChange, options, inAddTutorForm = false }) => {
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
    <div ref={ref} className="relative">
      {!inAddTutorForm && (
        <Label
          htmlFor="input-type-teaching-mode"
          className="font-sans text-[#81819a] text-base felx gap-x-0 mb-1 "
        >
          Teaching mode<span className="text-red-500 ml-0.5">*</span>
        </Label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer focus:outline-none transition-all duration-200
    bg-[#13131A] border border-white/10 text-white focus:border-[#20DE8B] focus:ring-2 focus:ring-[#20DE8B]/30 min-w-[140px]`}
      >
        <span className={value ? "text-white" : "text-[#4c4b6b]"}>
          {value || options[0]}
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
        <ul className="absolute z-50 w-full mt-1 bg-[#13131A] border border-white/15 rounded-lg shadow-xl overflow-hidden min-w-[140px]">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                onChange(opt === "All subjects" ? "" : opt);
                setOpen(false);
              }}
              className="px-3 py-2 cursor-pointer text-white hover:bg-[#0DBF82] hover:text-[#081A12] transition-colors duration-150 "
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
