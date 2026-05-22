import { connectDB } from "@/lib/mongodb";
import { Tutor } from "@/lib/models/Tutor";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { LuCalendarPlus } from "react-icons/lu";

export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  await connectDB();
  const tutor = await Tutor.findById(id).lean();
  return {
    title: `${tutor.name} | Mediqueue`,
    description: `Learn from ${tutor.name}, a ${tutor.subject} expert with ${tutor.experience} years of experience.`,
  };
};

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
};

const TutorDetailsPage = async ({ params }) => {
  const { id } = await params;

  console.log("Looking for ID:", id);

  await connectDB();

  const tutor = await Tutor.findById(id).lean();

  if (!tutor) return <div>Tutor not found</div>;

  return (
    <div className="w-11/12 sm:max-w-9/12 mx-auto py-15">
      <Link
        href="/tutors"
        className="font-sans font-medium text-base capitalize text-[#9896AF] flex items-center gap-2 "
      >
        <FaArrowLeftLong />
        back to tutors
      </Link>
      <div className="max-w-12/12 grid grid-cols-1 md:grid-cols-3 p-3 py-5 gap-5 mx-auto bg-[#13131A]/80 border-2 border-white/5 rounded-xl mt-10">
        <div className="relative w-44 h-44 mx-auto mt-6 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_25px_rgba(74,255,196,0.08)] col-span-1">
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

        <div className="col-span-2 flex flex-col justify-center">
          <div className=" py-4 space-y-1.5">
            <h3 className="font-bold text-2xl capitalize text-center md:text-start">
              {tutor.name}
            </h3>

            <h3 className="font-sans text-[#2DE8A8] text-base uppercase font-medium text-center md:text-start">
              {tutor.subject}
            </h3>
          </div>

          <div className="flex gap-2 justify-center md:justify-start flex-wrap mt-4 mb-7">
            <span className="p-2 flex items-center gap-1.5 rounded-full border-2 border-[#292933] bg-[#1F1F2A]/40 px-4 py-2 text-[13px] font-medium text-[#8E91B0] transition-all duration-150  capitalize">
              {tutor.teachingMode}
            </span>
            <span className="p-2 flex items-center gap-1.5 rounded-full border-2 border-[#292933] bg-[#1F1F2A]/40 px-4 py-2 text-[13px] font-medium text-[#8E91B0] transition-all duration-150  capitalize ">
              {tutor.experience}
            </span>
            <span className="p-2 flex items-center gap-1.5 rounded-full border-2 border-[#292933] bg-[#1F1F2A]/40 px-4 py-2 text-[13px] font-medium text-[#8E91B0] transition-all duration-150  capitalize ">
              {tutor.location}
            </span>
            <span className=" p-2 flex items-center gap-1.5 rounded-full border-2 border-[#4AFFC422] bg-[#4AFFC41A] px-4 py-2 text-[13px] font-medium text-[#4AFFC4] transition-all duration-150 hover:bg-[#4AFFC422] capitalize">{`${tutor.totalSlots} slots left`}</span>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <div className=" min-w-30 p-4 text-center group relative bg-[#13131A]/80 rounded-xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#4affc4]/20 hover:-translate-y-1 pb-5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-28 left-1/2 h-100 w-175 -translate-x-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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
              <span className="text-xs uppercase text-[#585C77] font-sans tracking-wider block mb-1">
                fee/hr
              </span>
              <h2 className="font-serif text-xl font-bold text-white capitalize">
                <span className="font-serif font-medium text-3xl text-[#2DE8A8]">
                  ৳
                </span>
                <span className="font-serif font-extrabold text-3xl text-[#2DE8A8]">
                  {tutor.pricePerHour}
                </span>
              </h2>
            </div>

            <div className=" min-w-30 p-4 text-center group relative bg-[#13131A]/80 rounded-xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#4affc4]/20 hover:-translate-y-1 pb-5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-28 left-1/2 h-100 w-175 -translate-x-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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
              <span className="text-xs uppercase text-[#585C77] font-sans tracking-wider block mb-1">
                slots left
              </span>
              <h2 className="font-serif text-xl font-medium text-white capitalize">
                {tutor.totalSlots}
              </h2>
            </div>

            <div className=" min-w-30 p-4 text-center group relative bg-[#13131A]/80 rounded-xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#4affc4]/20 hover:-translate-y-1 pb-5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-28 left-1/2 h-100 w-175 -translate-x-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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
              <span className="text-xs uppercase text-[#585C77] font-sans tracking-wider block mb-1">
                days
              </span>
              <h2 className="font-serif text-xl font-medium text-white capitalize">
                {tutor.availableDays}
              </h2>
            </div>

            <div className=" min-w-30 p-4 text-center group relative bg-[#13131A]/80 rounded-xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#4affc4]/20 hover:-translate-y-1 pb-5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-28 left-1/2 h-100 w-175 -translate-x-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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
              <span className="text-xs uppercase text-[#585C77] font-sans tracking-wider block mb-1">
                Starts
              </span>
              <h2 className="font-serif text-xl font-medium text-white capitalize">
                {formatDate(tutor.startDate)}
              </h2>
            </div>
          </div>
          <Link
            href={`/tutor/${tutor._id}`}
            className="inline-flex w-fit items-center mt-8 gap-1.5 rounded-2xl border border-[#0DBF82] bg-[#0DBF82] px-5 py-2 text-lg font-semibold text-[#081A12] transition-all duration-150 hover:border-[#2DE8A8] hover:bg-[#2DE8A8] capitalize"
            style={{ boxShadow: "0 0 20px rgba(74,255,196,0.133)" }}
          >
            <LuCalendarPlus />
            Book session
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailsPage;
