import {
  TbCertificate,
  TbClockCheck,
  TbFilter,
  TbShieldCheck,
} from "react-icons/tb";

const Platform = () => {
  return (
    <div className="max-w-11/12 mx-auto py-15">
      <div>
        <h3 className="font-sans text-[#2DE8A8] uppercase font-medium ">
          Platform
        </h3>
        <h1 className="font-serif text-4xl capitalize my-3">
          Everything you need
        </h1>
        <p className="font-sans font-medium text-base capitalize text-[#9896AF]">
          Built for students who take their education seriously
        </p>
      </div>

      <div
        className="max-w-10/12 mx-auto
         mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:grid-rows-2 gap-4"
      >
        <div className="lg:col-span-1 lg:row-span-2 bg-[#13131A]/80 border-2 border-white/5 rounded-xl p-6 py-10 flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:border-[#4affc4]/20 hover:-translate-y-0.5">
          <div className="bg-[#0DBF82]/20 p-4 rounded-box text-2xl font-extrabold text-[#4AFEC3] border-2 border-[#0DBF82]/40">
            <TbClockCheck />
          </div>
          <h3 className="font-medium text-xl capitalize mt-3 text-center">
            Smart slot management
          </h3>
          <p className="text-[#5B5C77] text-center">
            Real-time availability with auto-decrement on every confirmed
            booking. No double-bookings, ever.
          </p>
        </div>

        <div className="lg:col-span-2 lg:row-span-1 bg-[#13131A]/80 border-2 border-white/5 rounded-xl p-6 py-10 flex flex-col items-center gap-4 transition-all duration-500 hover:border-[#4affc4]/20 hover:-translate-y-0.5">
          <div className="bg-[#9C8EFE]/20 p-4 rounded-box text-2xl font-extrabold text-[#9C8EFE] border-2 border-[#9C8EFE]/40">
            <TbCertificate />
          </div>
          <h3 className="font-medium text-xl capitalize mt-3 text-center">
            Smart slot management
          </h3>
          <p className="text-[#5B5C77] text-center">
            Real-time availability with auto-decrement on every confirmed
            booking. No double-bookings, ever.
          </p>
        </div>

        <div className="lg:col-span-1 lg:row-span-1 bg-[#13131A]/80 border-2 border-white/5 rounded-xl p-6 py-10 flex flex-col items-center gap-4 transition-all duration-500 hover:border-[#4affc4]/20 hover:-translate-y-0.5">
          <div className="bg-[#FFD167]/20 p-4 rounded-box text-2xl font-extrabold text-[#FFD167] border-2 border-[#FFD167]/40">
            <TbFilter />
          </div>
          <h3 className="font-medium text-xl capitalize mt-3 text-center">
            Smart slot management
          </h3>
          <p className="text-[#5B5C77] text-center">
            Real-time availability with auto-decrement on every confirmed
            booking. No double-bookings, ever.
          </p>
        </div>

        <div className="lg:col-span-1 lg:row-span-1 bg-[#13131A]/80 border-2 border-white/5 rounded-xl p-6 py-10 flex flex-col items-center gap-4 transition-all duration-500 hover:border-[#4affc4]/20 hover:-translate-y-0.5">
          <div className="bg-[#FF6B6B]/20 p-4 rounded-box text-2xl font-extrabold text-[#FF6B6B] border-2 border-[#FF6B6B]/40">
            <TbShieldCheck />
          </div>
          <h3 className="font-medium text-xl capitalize mt-3 text-center">
            Smart slot management
          </h3>
          <p className="text-[#5B5C77] text-center">
            Real-time availability with auto-decrement on every confirmed
            booking. No double-bookings, ever.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Platform;
