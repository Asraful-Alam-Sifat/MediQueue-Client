import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
const mockTutors = [
  {
    id: 1,
    name: "Dr. Aisha Rahman",
    subject: "Mathematics",
    fee: 600,
    slots: 8,
    mode: "Online",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
  },
  {
    id: 2,
    name: "Prof. Karim Hossain",
    subject: "Physics",
    fee: 700,
    slots: 5,
    mode: "Both",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karim",
  },
  {
    id: 3,
    name: "Dr. Fatima Begum",
    subject: "Chemistry",
    fee: 650,
    slots: 6,
    mode: "Offline",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
  },
];

const MyTutorsClient = () => {
  const tutors = mockTutors;

  return (
 <div className="min-h-screen text-[#94a3b8] p-4 md:p-6 lg:p-10 font-sans">
  {/* Header */}
  <div className="max-w-7xl mx-auto mb-6">
    <h3 className="text-[#2DE8A8] uppercase font-medium tracking-wide text-sm">
      Dashboard
    </h3>

    <h1 className="font-serif text-3xl md:text-4xl capitalize mt-2 text-white">
      My Tutors
    </h1>

    <p className="font-medium text-sm md:text-base text-[#9896AF] mt-1">
      Tutors you've created on the platform
    </p>
  </div>

  {/* ============================= */}
  {/* Desktop & Tablet Table */}
  {/* ============================= */}

  <div className="hidden lg:block max-w-7xl mx-auto bg-[#13171d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
    <div className="overflow-x-auto">
      <table className="min-w-[850px] w-full text-left border-collapse">
        <thead className="bg-[#161b22] sticky top-0 z-10">
          <tr className="border-b border-white/10 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            <th className="py-4 px-6">Tutor</th>

            <th className="py-4 px-6">Subject</th>

            <th className="py-4 px-6">Fee / Hr</th>

            {/* Hide on tablet */}
            <th className="py-4 px-6 hidden lg:table-cell">Slots</th>

            {/* Hide on tablet */}
            <th className="py-4 px-6 hidden lg:table-cell">Mode</th>

            <th className="py-4 px-6 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/5 text-sm bg-[#13131A]">
          {tutors.map((tutor) => (
            <tr
              key={tutor.id}
              className="hover:bg-[#161b22]/40 transition-all duration-200 group"
            >
              {/* Tutor */}
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-700 shrink-0">
                    <Image
                      src={tutor.avatar}
                      width={100}
                      height={100}
                      alt={tutor.name}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div>
                    <p className="font-medium text-gray-200 group-hover:text-white transition-colors">
                      {tutor.name}
                    </p>
                  </div>
                </div>
              </td>

              {/* Subject */}
              <td className="py-4 px-6 text-gray-400">
                {tutor.subject}
              </td>

              {/* Fee */}
              <td className="py-4 px-6 font-semibold text-[#2DE8A8]">
                ৳{tutor.fee}
              </td>

              {/* Slots */}
              <td className="py-4 px-6 text-gray-300 hidden lg:table-cell">
                {tutor.slots}
              </td>

              {/* Mode */}
              <td className="py-4 px-6 hidden lg:table-cell">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
                  ${
                    tutor.mode === "Online"
                      ? "bg-[#2DE8A8]/20 text-[#2DE8A8] border-[#2DE8A8]/30"
                      : tutor.mode === "Offline"
                        ? "bg-[#E94E77]/20 text-[#E94E77] border-[#E94E77]/30"
                        : "bg-yellow-100/20 text-yellow-200 border-yellow-300/30"
                  }`}
                >
                  {tutor.mode}
                </span>
              </td>

              {/* Actions */}
              <td className="py-4 px-6">
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                    title="Edit Tutor"
                  >
                    <TbEdit className="w-5 h-5" />
                  </button>

                  <button
                    className="p-2 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all bg-[#E94E77]/10 text-[#E94E77] border border-[#E94E77]/20"
                    title="Delete Tutor"
                  >
                    <RiDeleteBin6Line className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Empty State */}
    {tutors.length === 0 && (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-gray-500 text-lg">
          No tutors created yet
        </p>

        <button className="mt-4 px-5 py-2 rounded-lg bg-[#2DE8A8] text-black font-medium hover:opacity-90 transition">
          Create Tutor
        </button>
      </div>
    )}
  </div>

  {/* ============================= */}
  {/* Mobile Cards */}
  {/* ============================= */}

  <div className="lg:hidden max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
    {tutors.map((tutor) => (
      <div
        key={tutor.id}
        className="bg-[#13171d] border border-white/10 rounded-2xl p-4 shadow-xl"
      >
        {/* Top */}
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-700 shrink-0">
            <Image
              src={tutor.avatar}
              width={100}
              height={100}
              alt={tutor.name}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-white font-semibold text-base">
              {tutor.name}
            </h2>

            <p className="text-sm text-gray-400">
              {tutor.subject}
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
          <div>
            <p className="text-gray-500">Fee</p>

            <p className="text-[#2DE8A8] font-semibold mt-1">
              ৳{tutor.fee}/hr
            </p>
          </div>

          <div>
            <p className="text-gray-500">Slots</p>

            <p className="text-gray-300 font-medium mt-1">
              {tutor.slots}
            </p>
          </div>
        </div>

        {/* Mode */}
        <div className="mt-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
            ${
              tutor.mode === "Online"
                ? "bg-[#2DE8A8]/20 text-[#2DE8A8] border-[#2DE8A8]/30"
                : tutor.mode === "Offline"
                  ? "bg-[#E94E77]/20 text-[#E94E77] border-[#E94E77]/30"
                  : "bg-yellow-100/20 text-yellow-200 border-yellow-300/30"
            }`}
          >
            {tutor.mode}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-5">
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <TbEdit className="w-4 h-4" />
            Edit
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
            <RiDeleteBin6Line className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    ))}

    {/* Empty State */}
    {tutors.length === 0 && (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-gray-500 text-lg text-center">
          No tutors created yet
        </p>

        <button className="mt-4 px-5 py-2 rounded-lg bg-[#2DE8A8] text-black font-medium hover:opacity-90 transition">
          Create Tutor
        </button>
      </div>
    )}
  </div>
</div>
  );
};

export default MyTutorsClient;
