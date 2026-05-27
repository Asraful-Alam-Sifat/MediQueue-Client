"use client";

import Image from "next/image";
import { RiDeleteBin6Line, RiCloseLine } from "react-icons/ri";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const MySessionsClient = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [activeBooking, setActiveBooking] = useState(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

// ...existing code...
useEffect(() => {
  if (!session?.user?.email) return;

  let isMounted = true;

  const fetchBookings = async () => {
    if (!isMounted) return;
    setLoadingBookings(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MEDI_QUEUE_SERVER_URL}/bookings`
      );
      if (!res.ok) {
        toast.error("Failed to load booked sessions");
        return;
      }
      const data = await res.json();
      if (!isMounted) return;
      const myData = data.filter((b) => b.email === session.user.email);
      setBookings(myData);
    } catch (error) {
      if (isMounted) console.error("Error fetching bookings:", error);
    } finally {
      if (isMounted) setLoadingBookings(false);
    }
  };

  fetchBookings();
  return () => {
    isMounted = false;
  };
}, [session]);
// ...existing code...

  const openCancelModal = (booking) => {
    setActiveBooking(booking);
    setIsCancelModalOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (!activeBooking?._id) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MEDI_QUEUE_SERVER_URL}/bookings/${activeBooking._id}`,
        { method: "DELETE" },
      );

      if (res.ok) {
        toast.success("Session booking cancelled successfully");
        setBookings(bookings.filter((b) => b._id !== activeBooking._id));
      } else {
        toast.error("Failed to cancel session");
      }
    } catch (err) {
      toast.error("An unexpected server error occurred");
    } finally {
      setIsCancelModalOpen(false);
      setActiveBooking(null);
    }
  };

  if (isPending || loadingBookings) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#13131A]">
        <p className="text-lg tracking-wide font-sans animate-pulse">
          Loading your booked sessions...
        </p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen text-[#94a3b8] p-4 md:p-6 lg:p-10 font-sans relative">
      <div className="max-w-7xl mx-auto mb-6">
        <h3 className="text-[#2DE8A8] uppercase font-medium tracking-wide text-sm">
          Dashboard
        </h3>
        <h1 className="font-serif text-3xl md:text-4xl capitalize mt-2 text-white">
          My booked sessions
        </h1>
        <p className="font-medium text-sm md:text-base text-[#9896AF] mt-1">
          Sessions booked under your account
        </p>
      </div>

      {/* Desktop Table View */}
      {bookings.length > 0 && (
        <div className="hidden lg:block max-w-7xl mx-auto bg-[#13171d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[850px] w-full text-left border-collapse">
              <thead className="bg-[#161b22] sticky top-0 z-10">
                <tr className="border-b border-white/10 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  <th className="py-4 px-6">Tutor</th>
                  <th className="py-4 px-6">Student</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Token</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5 text-sm bg-[#13131A]">
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-[#161b22]/40 transition-all duration-200 group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-700 shrink-0">
                          <Image
                            src={
                              booking.tutorPhoto &&
                              booking.tutorPhoto.trim() !== ""
                                ? booking.tutorPhoto
                                : `https://api.dicebear.com/7.x/open-peeps/svg?seed=${encodeURIComponent(
                                    booking.tutorName || "Tutor",
                                  )}`
                            }
                            width={40}
                            height={40}
                            alt={booking.tutorName || "Tutor"}
                            className="object-cover w-full h-full"
                            unoptimized
                          />
                        </div>
                        <p className="font-medium text-gray-200 group-hover:text-white transition-colors">
                          {booking.tutorName}
                        </p>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-gray-300">
                      {booking.studentName || "N/A"}
                    </td>

                    <td className="py-4 px-6 text-gray-400">{booking.email}</td>

                    <td className="py-4 px-6">
                      <span className="font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-md text-xs uppercase">
                        {booking.token}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                          booking.status === "confirmed"
                            ? "bg-[#2DE8A8]/20 text-[#2DE8A8] border-[#2DE8A8]/30"
                            : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        }`}
                      >
                        {booking.status || "pending"}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => openCancelModal(booking)}
                        className="px-3 py-1.5 text-xs rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all duration-200"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mobile view  */}
      {bookings.length > 0 && (
        <div className="lg:hidden max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-[#13171d] border border-white/10 rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-700 shrink-0">
  <Image
    src={
      booking.tutorPhoto && booking.tutorPhoto.trim() !== ""
        ? booking.tutorPhoto
        : `https://api.dicebear.com/7.x/open-peeps/svg?seed=${encodeURIComponent(
            booking.tutorName || "Tutor"
          )}`
    }
    width={40}
    height={40}
    alt={booking.tutorName || "Tutor"}
    className="object-cover w-full h-full"
    unoptimized
  />
</div>
                <div className="flex-1">
                  <h2 className="text-white font-semibold text-base">
                    {booking.tutorName}
                  </h2>
                  <p className="text-xs text-gray-400">
                    Subject: {booking.subject || "General"}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mt-4 text-sm border-t border-white/5 pt-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Student:</span>
                  <span className="text-gray-300 font-medium">
                    {booking.studentName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span className="text-gray-400 font-mono text-xs">
                    {booking.email}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Token:</span>
                  <span className="font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded text-xs uppercase">
                    {booking.token}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 mt-5 pt-3 border-t border-white/5">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                    booking.status === "confirmed"
                      ? "bg-[#2DE8A8]/20 text-[#2DE8A8] border-[#2DE8A8]/30"
                      : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                  }`}
                >
                  {booking.status || "pending"}
                </span>
                <button
                  onClick={() => openCancelModal(booking)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-xs hover:bg-red-500 hover:text-white transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State View */}
      {bookings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 max-w-7xl mx-auto bg-[#13171d] border border-white/10 rounded-2xl shadow-xl">
          <p className="text-gray-400 text-lg font-medium">
            No sessions booked yet
          </p>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-[#191921] border border-white/10 w-full max-w-sm rounded-2xl shadow-2xl p-6 text-center text-white relative">
            <button
              onClick={() => setIsCancelModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white hover:bg-white/15 rounded-lg transition"
            >
              <RiCloseLine className="w-6 h-6" />
            </button>
            <div className="w-12 h-12 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <RiDeleteBin6Line className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-white">Cancel Booking?</h3>
            <p className="text-sm text-gray-400 mt-2">
              Are you sure you want to cancel your session with{" "}
              <span className="text-gray-200 font-medium">
                "{activeBooking?.tutorName}"
              </span>
              ?
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="px-4 py-2 rounded-xl text-sm border border-white/10 hover:bg-white/5 transition flex-1"
              >
                Keep
              </button>
              <button
                onClick={handleCancelConfirm}
                className="px-4 py-2 rounded-xl text-sm bg-red-500 border border-red-600 text-white font-medium hover:bg-red-600 transition flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySessionsClient;
