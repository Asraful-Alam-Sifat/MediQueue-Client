"use client";

import Image from "next/image";
import { RiDeleteBin6Line, RiCloseLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const MyTutorsClient = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [tutors, setTutors] = useState([]);
  const [loadingTutors, setLoadingTutors] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTutor, setActiveTutor] = useState(null);

  const [editName, setEditName] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editSlots, setEditSlots] = useState("");
  const [editMode, setEditMode] = useState("");
  const [editPhoto, setEditPhoto] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const fetchMyTutors = async () => {
    if (!session?.user?.email) return;
    try {
      setLoadingTutors(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MEDI_QUEUE_SERVER_URL}/my-tutors?email=${session.user.email}`,
      );
      if (res.ok) {
        const data = await res.json();
        setTutors(data);
      } else {
        toast.error("Failed to load your tutors");
      }
    } catch (error) {
      console.error("Error fetching tutors:", error);
    } finally {
      setLoadingTutors(false);
    }
  };

  useEffect(() => {
    fetchMyTutors();
  }, [session]);



  if (isPending || loadingTutors) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#13131A]">
        <p className="text-lg tracking-wide font-sans animate-pulse">
          Loading your tutors...
        </p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen text-[#94a3b8] p-4 md:p-6 lg:p-10 font-sans relative">
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

      {/* Desktop Table View */}

      {tutors.length > 0 && (
        <div className="hidden lg:block max-w-7xl mx-auto bg-[#13171d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[850px] w-full text-left border-collapse">
              <thead className="bg-[#161b22] sticky top-0 z-10">
                <tr className="border-b border-white/10 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  <th className="py-4 px-6">Tutor</th>
                  <th className="py-4 px-6">Subject</th>
                  <th className="py-4 px-6">Fee / Hr</th>
                  <th className="py-4 px-6 hidden lg:table-cell">Slots</th>
                  <th className="py-4 px-6 hidden lg:table-cell">Mode</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5 text-sm bg-[#13131A]">
                {tutors.map((tutor) => (
                  <tr
                    key={tutor._id}
                    className="hover:bg-[#161b22]/40 transition-all duration-200 group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-700 shrink-0">
                          <Image
                            src={
                              tutor.photo && tutor.photo.trim() !== ""
                                ? tutor.photo
                                : `https://api.dicebear.com/7.x/open-peeps/svg?seed=${encodeURIComponent(tutor.name)}`
                            }
                            width={100}
                            height={100}
                            alt={tutor.name}
                            className="object-cover w-full h-full"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-200 group-hover:text-white transition-colors">
                            {tutor.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-gray-400">{tutor.subject}</td>

                    <td className="py-4 px-6 font-semibold text-[#2DE8A8]">
                      ৳{tutor.pricePerHour || tutor.fee}
                    </td>

                    <td className="py-4 px-6 text-gray-300 hidden lg:table-cell">
                      {tutor.totalSlots || tutor.slots || 0}
                    </td>

                    <td className="py-4 px-6 hidden lg:table-cell">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
                        ${
                          tutor.teachingMode === "Online" ||
                          tutor.mode === "Online"
                            ? "bg-[#2DE8A8]/20 text-[#2DE8A8] border-[#2DE8A8]/30"
                            : "bg-[#E94E77]/20 text-[#E94E77] border-[#E94E77]/30"
                        }`}
                      >
                        {tutor.teachingMode || tutor.mode}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(tutor)}
                          className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                          title="Edit Tutor"
                        >
                          <TbEdit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(tutor)}
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
        </div>
      )}

      {/* Mobile Card Layout */}

      {tutors.length > 0 && (
        <div className="lg:hidden max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tutors.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-[#13171d] border border-white/10 rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-700 shrink-0">
                  <Image
                    src={
                      tutor.photo && tutor.photo.trim() !== ""
                        ? tutor.photo
                        : `https://api.dicebear.com/7.x/open-peeps/svg?seed=${encodeURIComponent(tutor.name)}`
                    }
                    width={100}
                    height={100}
                    alt={tutor.name}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-white font-semibold text-base">
                    {tutor.name}
                  </h2>
                  <p className="text-sm text-gray-400">{tutor.subject}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
                <div>
                  <p className="text-gray-500">Fee</p>
                  <p className="text-[#2DE8A8] font-semibold mt-1">
                    ৳{tutor.pricePerHour || tutor.fee}/hr
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Slots</p>
                  <p className="text-gray-300 font-medium mt-1">
                    {tutor.totalSlots || tutor.slots || 0}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
                  ${
                    tutor.teachingMode === "Online" || tutor.mode === "Online"
                      ? "bg-[#2DE8A8]/20 text-[#2DE8A8] border-[#2DE8A8]/30"
                      : "bg-[#E94E77]/20 text-[#E94E77] border-[#E94E77]/30"
                  }`}
                >
                  {tutor.teachingMode || tutor.mode}
                </span>
              </div>

              <div className="flex items-center gap-3 mt-5">
                <button
                  onClick={() => openEditModal(tutor)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20"
                >
                  <TbEdit className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => openDeleteModal(tutor)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20"
                >
                  <RiDeleteBin6Line className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTutorsClient;
