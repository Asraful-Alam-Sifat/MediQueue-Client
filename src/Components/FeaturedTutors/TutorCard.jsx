import Image from "next/image";
import Link from "next/link";
import { FaRegClock } from "react-icons/fa";
import { LuCalendarPlus } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import {
  MdOutlineComputer,
  MdOutlineErrorOutline,
} from "react-icons/md";

const TutorCard = ({ tutor }) => {
  // console.log(tutor);
  const isBooked = tutor.totalSlots === tutor.bookedSlots;
  return (
    <div className="group relative bg-[#13131A]/80 rounded-xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#4affc4]/20 hover:-translate-y-1 pb-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 h-[400px] w-[700px] -translate-x-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse, rgba(74,255,196,0.08) 0%, transparent 70%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(74,255,196,0.133), transparent)",
        }}
      />

      <div className="relative w-24 h-24 mx-auto mt-6 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_25px_rgba(74,255,196,0.08)]">
        <Image
          src={
            tutor.photo ||
            `https://api.dicebear.com/7.x/open-peeps/svg?seed=${encodeURIComponent(
              tutor.name,
            )}`
          }
          alt={`${tutor.name} avatar`}
          width={96}
          height={96}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
        />
      </div>

      <div className="px-6 py-4 space-y-1.5">
        <h3 className="font-medium text-xl capitalize">{tutor.name}</h3>

        <h3 className="font-sans text-[#0DBF82] text-sm uppercase font-medium">
          {tutor.subject}
        </h3>
      </div>

      <div className="text-[#5B5C77] space-y-1.5 px-6 mx-auto">
        <p className="flex items-center gap-1.5 ">
          <IoLocationOutline />
          {tutor.location}
        </p>
        <p className="flex items-center gap-1.5 ">
          <FaRegClock />
          {tutor.timeSlot}
        </p>
        <p className="flex items-center gap-1.5 ">
          <MdOutlineComputer />
          {tutor.teachingMode}
        </p>

        <div>
          {isBooked ? (
            <span className="text-red-400 text-[17px] flex items-center gap-1.5 ">
              <MdOutlineErrorOutline />
              Fully booked
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
      <hr className="w-full mb-5 mt-7 border-white/10" />

      <div className="px-6 mx-auto flex justify-between">
        <h1>
          <span className="font-serif font-semibold text-3xl">৳</span>
          <span className="font-serif font-extrabold text-3xl">
            {tutor.pricePerHour}
          </span>
          <span className="font-normal text-[#5B5C77] text-xl font-sans">
            /hr
          </span>
        </h1>

        <Link
          href={""}
          className="inline-flex items-center gap-1.5 rounded-2xl border border-[#0DBF82] bg-[#0DBF82] px-4 py-2 text-[13px] font-semibold text-[#081A12] transition-all duration-150 hover:border-[#2DE8A8] hover:bg-[#2DE8A8] capitalize"
          style={{ boxShadow: "0 0 20px rgba(74,255,196,0.133)" }}
        >
          <LuCalendarPlus />
          Book
        </Link>
      </div>
    </div>
  );
};

export default TutorCard;
