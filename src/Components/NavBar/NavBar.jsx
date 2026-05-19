import Logo from "@/assets/mediqueue-logo.png";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <div
      className="navbar sticky top-0 z-50 border-b bg-transparent border-white/5  sm:px-10 py-4 flex-col sm:flex-row gap-y-4 justify-between "
      style={{
        background: "rgba(12, 12, 16, 0.85)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="navbar-start w-full sm:w-auto flex flex-row items-center justify-center sm:justify-start gap-2 ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <Link
              href={"/tutors"}
              className="text-white/45  hover:text-white hover:opacity-95 transition-all duration-150 text-xl capitalize"
            >
              <li className="font-sans">tutors</li>
            </Link>
            <Link
              href={"/add-tutor"}
              className="text-white/45  hover:text-white hover:opacity-95 transition-all duration-150 text-xl capitalize"
            >
              <li className="font-sans">add tutor</li>
            </Link>
            <Link
              href={"/my-tutors"}
              className="text-white/45  hover:text-white hover:opacity-95 transition-all duration-150 text-xl capitalize"
            >
              {" "}
              <li className="font-sans">my tutors</li>
            </Link>
            <Link
              href={"/sessions"}
              className="text-white/45  hover:text-white hover:opacity-95 transition-all duration-150 text-xl capitalize"
            >
              <li className="font-sans">my sessions</li>
            </Link>
            <li className="sm:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-2 text-center">
              <button className="btn btn-sm btn-ghost w-full justify-start text-emerald-400 ">
                Sign In
              </button>
              <button className="btn btn-sm bg-emerald-500 hover:bg-emerald-600 text-white w-full">
                Register Free
              </button>
            </li>
          </ul>
        </div>

        <Link href={"/"} className="flex items-end-safe gap-1">
          <Image src={Logo} alt="logo" className="w-15" />
          <h1 className="font-serif font-extrabold text-4xl text-[#1B54A4] ">
            Medi<span className="text-[#0DBF82]">Queue</span>
          </h1>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal space-x-9 px-1 text-xl">
          <Link
            href={"/tutors"}
            className="text-white/45  hover:text-white hover:opacity-95 transition-all duration-150 text-xl capitalize"
          >
            <li className="font-sans">tutors</li>
          </Link>
          <Link
            href={"/add-tutor"}
            className="text-white/45  hover:text-white hover:opacity-95 transition-all duration-150 text-xl capitalize"
          >
            <li className="font-sans">add tutor</li>
          </Link>
          <Link
            href={"/my-tutors"}
            className="text-white/45  hover:text-white hover:opacity-95 transition-all duration-150 text-xl capitalize"
          >
            {" "}
            <li className="font-sans">my tutors</li>
          </Link>
          <Link
            href={"/sessions"}
            className="text-white/45  hover:text-white hover:opacity-95 transition-all duration-150 text-xl capitalize"
          >
            <li className="font-sans">my sessions</li>
          </Link>
        </ul>
      </div>

      <div className="navbar-end hidden sm:flex w-full sm:w-auto flex-row items-center justify-center sm:justify-end gap-3">
        <Link
          href={""}
          className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#4AFFC422] bg-[#4AFFC41A] px-4 py-2 text-[13px] font-medium text-[#4AFFC4] transition-all duration-150 hover:bg-[#4AFFC422] capitalize"
        >
          sign in
        </Link>
        <Link
          href={""}
          className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#0DBF82] bg-[#0DBF82] px-4 py-2 text-[13px] font-semibold text-[#081A12] transition-all duration-150 hover:border-[#2DE8A8] hover:bg-[#2DE8A8] capitalize"
          style={{ boxShadow: "0 0 20px rgba(74,255,196,0.133)" }}
        >
          register free
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
