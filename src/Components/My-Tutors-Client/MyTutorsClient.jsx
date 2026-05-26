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

  // Handle opening Delete Modal
  const openDeleteModal = (tutor) => {
    setActiveTutor(tutor);
    setIsDeleteModalOpen(true);
  };

  // Handle Confirming Delete Operation
  const handleDeleteConfirm = async () => {
    if (!activeTutor?._id) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MEDI_QUEUE_SERVER_URL}/tutors/${activeTutor._id}`,
        { method: "DELETE" },
      );

      if (res.ok) {
        toast.success("Tutor listing deleted successfully");
        setTutors(tutors.filter((t) => t._id !== activeTutor._id));
      } else {
        toast.error("Failed to delete entry");
      }
    } catch (err) {
      toast.error("An expected error occurred");
    } finally {
      setIsDeleteModalOpen(false);
      setActiveTutor(null);
    }
  };

  // Handle opening Edit Modal
  const openEditModal = (tutor) => {
    setActiveTutor(tutor);
    setEditName(tutor.name || "");
    setEditSubject(tutor.subject || "");
    setEditPrice(tutor.pricePerHour || tutor.fee || "");
    setEditSlots(tutor.totalSlots || tutor.slots || "");
    setEditMode(tutor.teachingMode || tutor.mode || "Online");
    setEditPhoto(tutor.photo || "");
    setIsEditModalOpen(true);
  };

  // Handle Submitting Edit Changes
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!activeTutor?._id) return;

    const updatedPayload = {
      name: editName,
      subject: editSubject,
      pricePerHour: Number(editPrice),
      totalSlots: Number(editSlots),
      teachingMode: editMode,
      photo: editPhoto,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MEDI_QUEUE_SERVER_URL}/tutors/${activeTutor._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPayload),
        },
      );

      if (res.ok) {
        toast.success("Tutor updated successfully");
        setTutors(
          tutors.map((t) =>
            t._id === activeTutor._id ? { ...t, ...updatedPayload } : t,
          ),
        );
        setIsEditModalOpen(false);
      } else {
        toast.error("Failed to update profile changes");
      }
    } catch (err) {
      toast.error("Server connection lost");
    }
  };

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

      {/*  EMPTY STATE VIEW */}

      {tutors.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 max-w-7xl mx-auto bg-[#13171d] border border-white/10 rounded-2xl shadow-xl">
          <p className="text-gray-400 text-lg font-medium">
            No tutors created yet
          </p>
          <button
            onClick={() => router.push("/add-tutor")}
            className="mt-5 px-6 py-2.5 rounded-xl bg-[#2DE8A8] text-black font-semibold hover:opacity-90 transition shadow-lg shadow-[#2DE8A8]/10"
          >
            Create Tutor
          </button>
        </div>
      )}

      {/* EDIT MODAL  */}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-[#191921] border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden p-6 relative text-white">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white hover:bg-white/15 rounded-lg transition"
            >
              <RiCloseLine className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-semibold font-serif text-white mb-4">
              Update Tutor Specifications
            </h2>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[#13131A] border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#2DE8A8] text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1">
                  Subject Matter
                </label>
                <input
                  type="text"
                  value={editSubject}
                  onChange={(e) => setEditSubject(e.target.value)}
                  className="w-full bg-[#13131A] border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#2DE8A8] text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 font-medium mb-1">
                    Price per Hour (৳)
                  </label>
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="w-full bg-[#13131A] border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#2DE8A8] text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-medium mb-1">
                    Available Slots
                  </label>
                  <input
                    type="number"
                    value={editSlots}
                    onChange={(e) => setEditSlots(e.target.value)}
                    className="w-full bg-[#13131A] border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#2DE8A8] text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1">
                  Teaching Delivery Mode
                </label>
                <select
                  value={editMode}
                  onChange={(e) => setEditMode(e.target.value)}
                  className="w-full bg-[#13131A] border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#2DE8A8] text-sm"
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1">
                  Avatar Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={editPhoto}
                  onChange={(e) => setEditPhoto(e.target.value)}
                  className="w-full bg-[#13131A] border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#2DE8A8] text-sm"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm border border-white/10 hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-sm bg-[#2DE8A8] text-black font-semibold hover:opacity-90 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-[#191921] border border-white/10 w-full max-w-sm rounded-2xl shadow-2xl p-6 text-center text-white">
            <div className="w-12 h-12 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <RiDeleteBin6Line className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-white">
              Remove Tutor Profile?
            </h3>
            <p className="text-sm text-gray-400 mt-2">
              Are you sure you want to delete{" "}
              <span className="text-gray-200 font-medium">
                "{activeTutor?.name}"
              </span>
              ? This action is permanent.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded-xl text-sm border border-white/10 hover:bg-white/5 transition flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-xl text-sm bg-red-500 border border-red-600 text-white font-medium hover:bg-red-600 transition flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTutorsClient;
