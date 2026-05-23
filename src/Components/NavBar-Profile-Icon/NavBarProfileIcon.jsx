'use client';
import { authClient } from "@/lib/auth-client"
import Image from "next/image";
import Link from "next/link";


const NavBarProfileIcon = () => {
    const { 
        data: session, 
       
        refetch 
    } = authClient.useSession() 
    
    return (
        <div>
            {/* navbar-end */}
            <div className="navbar-end hidden sm:flex w-full sm:w-auto flex-row items-center justify-center sm:justify-end gap-3">
                {session ? (
                    /* ── Pill button ── */
                    <div className="relative group">
                        <div className="flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-[#16161F] border border-white/10 cursor-pointer  transition-colors duration-200 group-hover:bg-[#4AFFC41A]/15  group-hover:text-[#4AFFC4] group-hover:border-[#4AFFC422]    ">
                            
                            {/* Avatar circle */}
                            <div className="w-9 h-9 rounded-full p-0.5 overflow-hidden shrink-0 flex justify-center items-center bg-[#0DBF82]">
                                <Image
                                    src={
                                        session.user.image && session.user.image.trim() !== ""
                                            ? session.user.image
                                            : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(session.user.name)}&backgroundColor=0DBF82&fontFamily=Arial&fontSize=40&fontWeight=600`
                                    }
                                    alt="User Profile"
                                    width={44}
                                    height={44}
                                    className=" w-full h-full rounded-full object-cover"
                                    onError={(e) => {
                                        e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(session.user.name)}&backgroundColor=0DBF82`;
                                    }}
                                />
                            </div>

                            {/* Name */}
                            <span className="text-white font-semibold text-base leading-none">
                                {session.user.name}
                            </span>

                            {/* Chevron */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-white/60 group-hover:text-white transition-colors duration-200"
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </div>

                        {/* Dropdown menu */}
                        <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-[#4AFFC422] bg-[#4AFFC41A]/25 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <div className="p-3 border-b border-white/10">
                                <p className="text-white font-semibold text-sm truncate">
                                    {session.user.name}
                                </p>
                                <p className="text-[#81819a] text-xs truncate">
                                    {session.user.email}
                                </p>
                            </div>
                            <div className="p-1">
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#81819a] hover:text-white hover:bg-white/5 text-sm transition-colors duration-150"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="8" r="4" />
                                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                                    </svg>
                                    Profile
                                </Link>
                                <button
                                    onClick={async () => {
                                        await authClient.signOut();
                                        refetch();
                                    }}
                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#81819a] hover:text-red-400 hover:bg-red-500/10 text-sm transition-colors duration-150"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                        <polyline points="16 17 21 12 16 7" />
                                        <line x1="21" y1="12" x2="9" y2="12" />
                                    </svg>
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link
                            href={"/login"}
                            className="inline-flex items-center gap-1.5 rounded-[10px] border px-4 py-2 text-[13px] font-medium bg-[#4AFFC41A]  text-[#4AFFC4] border-[#4AFFC422]  transition-all duration-150 hover:bg-[#4AFFC422] capitalize"
                        >
                            sign in
                        </Link>
                        <Link
                            href={"/register"}
                            className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#0DBF82] bg-[#0DBF82] px-4 py-2 text-[13px] font-semibold text-[#081A12] transition-all duration-150 hover:border-[#2DE8A8] hover:bg-[#2DE8A8] capitalize"
                            style={{ boxShadow: "0 0 20px rgba(74,255,196,0.133)" }}
                        >
                            register free
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBarProfileIcon;