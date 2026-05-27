"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  RiUser3Line,
  RiMailLine,
  RiPhoneLine,
  RiCalendarEventLine,
  RiShieldCheckLine,
  RiTimeLine,
} from "react-icons/ri";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [totalBookings, setTotalBookings] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!session?.user?.email) return;
      try {
        setLoadingStats(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_MEDI_QUEUE_SERVER_URL}/bookings`,
        );
        if (res.ok) {
          const data = await res.json();
          const myBookings = data.filter((b) => b.email === session.user.email);
          setTotalBookings(myBookings.length);
        }
      } catch (error) {
        console.error("Error loading user stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchUserStats();
  }, [session]);

  if (isPending || loadingStats) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#13131A]">
        <p className="text-lg tracking-wide font-sans animate-pulse text-[#2DE8A8]">
          Loading profile details...
        </p>
      </div>
    );
  }

  if (!session) return null;

  const userImage =
    session.user.image ||
    `https://api.dicebear.com/7.x/open-peeps/svg?seed=${encodeURIComponent(session.user.name || "User")}`;
  const joinDate = session.user.createdAt
    ? new Date(session.user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recent Member";

  return (
    <div className="min-h-screen text-[#94a3b8] p-4 md:p-6 lg:p-10 font-sans relative bg-[#13131A]">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[350px] pointer-events-none opacity-25 z-0"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(74,255,196,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-8 relative z-10">
        <h3 className="text-[#2DE8A8] uppercase font-medium tracking-wide text-sm">
          Account Settings
        </h3>
        <h1 className="font-serif text-3xl md:text-4xl capitalize mt-2 text-white">
          My Personal Profile
        </h1>
        <p className="font-medium text-sm md:text-base text-[#9896AF] mt-1">
          Manage your verified account data and session metrics
        </p>
      </div>

      {/* Main Layout Card */}
      <div className="max-w-4xl mx-auto bg-[#13171d]/80 border-2 border-white/5 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="flex flex-col items-center col-span-1 border-b md:border-b-0 md:border-r border-white/5 pb-6 md:pb-0 md:pr-8">
            <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-[#2DE8A8]/30 bg-white/5 p-1 group shadow-[0_0_25px_rgba(74,255,196,0.1)]">
              <div className="w-full h-full relative rounded-xl overflow-hidden bg-[#191921]">
                <Image
                  src={userImage}
                  alt="User Avatar"
                  fill
                  sizes="144px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
              </div>
            </div>
            <h2 className="text-white font-semibold text-xl mt-4 text-center truncate w-full">
              {session.user.name}
            </h2>
            <span className="text-xs bg-[#2DE8A8]/10 text-[#2DE8A8] border border-[#2DE8A8]/20 px-2.5 py-0.5 rounded-full font-medium mt-2 uppercase tracking-wider">
              Verified Student
            </span>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#191921] border border-white/5 p-4 rounded-xl relative overflow-hidden group hover:border-[#2DE8A8]/20 transition-all duration-300">
                <span className="text-xs uppercase text-[#585C77] font-semibold tracking-wider block mb-1">
                  Total Bookings
                </span>
                <h2 className="text-3xl font-extrabold text-[#2DE8A8] font-serif">
                  {totalBookings}
                </h2>
                <RiTimeLine className="absolute right-4 bottom-4 w-5 h-5 text-white/5 group-hover:text-[#2DE8A8]/10 transition-colors" />
              </div>

              <div className="bg-[#191921] border border-white/5 p-4 rounded-xl relative overflow-hidden group hover:border-blue-500/20 transition-all duration-300">
                <span className="text-xs uppercase text-[#585C77] font-semibold tracking-wider block mb-1">
                  Account Status
                </span>
                <h2 className="text-xl font-bold text-blue-400 mt-1 uppercase tracking-wide flex items-center gap-1.5">
                  <RiShieldCheckLine className="inline w-5 h-5" /> Active
                </h2>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs uppercase font-semibold text-[#585C77] tracking-wider mb-2">
                  Full Account Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <RiUser3Line className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    readOnly
                    value={session.user.name || "N/A"}
                    className="w-full bg-[#13131A] border border-white/10 rounded-xl px-4 py-3 pl-11 text-white font-medium focus:outline-none opacity-80 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#585C77] tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <RiMailLine className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    readOnly
                    value={session.user.email || "N/A"}
                    className="w-full bg-[#13131A] border border-white/10 rounded-xl px-4 py-3 pl-11 text-white/60 font-mono text-sm focus:outline-none opacity-70 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#585C77] tracking-wider mb-2">
                  Member Since
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <RiCalendarEventLine className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    readOnly
                    value={joinDate}
                    className="w-full bg-[#13131A] border border-white/10 rounded-xl px-4 py-3 pl-11 text-white/60 font-medium focus:outline-none opacity-70 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
