"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const HamBurgerItem = () => {
  const { data: session, refetch } = authClient.useSession();

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden  ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content  rounded-box z-10 mt-3 w-52 py-3 border border-[#20DE8B]/20 bg-[#111118] shadow-2xl shadow-black/40"
      >
        <li>
          <Link
            href="/tutors"
            className="font-sans text-base text-[#81819a] hover:text-white transition-colors duration-150"
          >
            Tutors
          </Link>
        </li>
        <li>
          <Link
            href="/add-tutor"
            className="font-sans text-base text-[#81819a] hover:text-white transition-colors duration-150"
          >
            Add Tutor
          </Link>
        </li>
        <li>
          <Link
            href="/my-tutors"
            className="font-sans text-base text-[#81819a] hover:text-white transition-colors duration-150"
          >
            My Tutors
          </Link>
        </li>
        <li>
          <Link
            href="/my-sessions"
            className="font-sans text-base text-[#81819a] hover:text-white transition-colors duration-150"
          >
            My Sessions
          </Link>
        </li>

        {session?.user ? (
          <>
            <div className="flex sm:hidden  ">
              <div className="border-t border-white/10 mt-2.5 pt-2 px-3 w-full">
                <p className="font-semibold text-white  mt-2.5 text-lg truncate">
                  {session.user.name}
                </p>
                <p className="text-[#81819a] text-xs truncate">
                  {session.user.email}
                </p>
              </div>
            </div>

            <div className="flex sm:hidden w-full mt-1">
              <ul className="w-full">
                <li>
                  <Link
                    href="/profile"
                    className="font-sans text-sm text-[#81819a] hover:text-white hover:bg-white/5 rounded-lg px-3 py-2 transition-colors duration-150 flex items-center gap-2"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={async () => {
                      await authClient.signOut();
                      refetch();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#81819a] hover:text-red-400 hover:bg-red-500/10 text-sm transition-colors duration-150"
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
           <div className=" ">
            <Link
              href={"/login"}
              className="inline-flex items-center gap-1.5 rounded-[10px] border px-4 py-2 text-[13px] font-medium bg-[#4AFFC41A]  text-[#4AFFC4] border-[#4AFFC422]  transition-all duration-150 hover:bg-[#4AFFC422] capitalize w-full justify-center mb-2"
            >
              sign in
            </Link>
            <Link
              href={"/register"}
              className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#0DBF82] bg-[#0DBF82] px-4 py-2 text-[13px] font-semibold text-[#081A12] transition-all duration-150 hover:border-[#2DE8A8] hover:bg-[#2DE8A8] capitalize w-full justify-center"
              style={{ boxShadow: "0 0 20px rgba(74,255,196,0.133)" }}
            >
              register free
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default HamBurgerItem;
