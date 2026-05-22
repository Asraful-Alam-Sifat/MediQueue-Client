import Image from "next/image";
import Logo from "@/assets/mediqueue-logo.png";
import { TbBrandGoogle } from "react-icons/tb";

import Link from "next/link";
import LoginForm from "@/Components/Login/LoginForm";


const LoginPage = () => {

 

  return (
    <div className=" max-w-10/12 md:max-w-7/12 xl:max-w-4/12  mx-auto my-15 border-2 border-white/5 p-4 pt-8 sm:px-10 sm:py-10 group relative bg-[#13131A]/80 rounded-xl overflow-hidden transition-all duration-500 hover:border-[#4affc4]/20 hover:-translate-y-1 pb-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 h-[400px] w-[700px] -translate-x-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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

      <div>
        <div className="flex items-center mx-auto  justify-center gap-1.5 mb-5 ">
          <Image src={Logo} alt="logo" className="w-10" />
          <p className="font-serif font-extrabold text-[28px] text-[#1B54A4] capitalize">
            medi<span className="text-[#0DBF82] capitalize">Queue</span>
          </p>
        </div>

        <div>
          <h3 className="font-serif font-medium text-3xl text-center ">
            Welcome back
          </h3>
          <p className="font-sans text-[#5B5C77] text-center mt-2 text-base ">
            Sign in to continue learning
          </p>
        </div>

        <Link
          href={""}
          className="sm:w-2/3 mx-auto border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921] flex gap-1.5 px-10 py-2 mt-6 items-center justify-center"
        >
          <TbBrandGoogle className="text-red-500" />
          <span className="text-xs sm:text-sm"> Continue with Google</span>
        </Link>
      </div>

      <div className="grid grid-cols-3 items-center justify-evenly  my-6">
        <span className="bg-[#5B5C77]/35 h-[1px] w-full "></span>
        <span className="text-center text-xs sm:text-sm font-light  text-[#5B5C77] capitalize ">
          or sign in with email
        </span>
        <span className="bg-[#5B5C77]/35 h-[1px] w-full"> </span>
      </div>

      <LoginForm/>
      <p className="text-center text-sm sm:text-base  text-[#5B5C77]">
        No account?{" "}
        <Link
          href={"/register"}
          className="font-sans text-[#2DE8A8] capital font-medium "
        >
          Create one free
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
