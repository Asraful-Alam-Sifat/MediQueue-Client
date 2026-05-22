import Image from "next/image";
import Logo from "@/assets/mediqueue-logo.png";
import { TbBrandGoogle } from "react-icons/tb";
import { Form, Input, Label } from "@heroui/react";
import Link from "next/link";

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

      <Form className="flex  flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label
            htmlFor="input-type-email"
            className="font-sans text-[#81819a] text-base felx gap-x-0 "
          >
            Email
          </Label>
          <Input
            id="input-type-email"
            name="email"
            placeholder="jane@example.com"
            className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921] focus:border-[#20DE8B] focus:ring-2 focus:ring-[#20DE8B]/30 transition-all duration-200"
            type="email"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between mb-1 mt-4 items-center">
            <Label
              htmlFor="input-type-password"
              className="font-sans text-[#81819a] text-base felx gap-x-0 "
            >
              Password
            </Label>{" "}
            <Link
              href={"/forgot-password"}
              className="font-sans text-[#2DE8A8] font-medium text-sm  sm:text-base"
            >
              Forgot?
            </Link>
          </div>
          <Input
            id="input-type-password"
            name="password"
            placeholder="••••••••"
            className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921] focus:border-[#20DE8B] focus:ring-2 focus:ring-[#20DE8B]/30 transition-all duration-200"
            type="password"
            required
          />
        </div>
        <Link
          href={"/login"}
          className="inline-flex items-center justify-center  w-full gap-1.5 rounded-[10px] border border-[#0DBF82] bg-[#0DBF82] px-4 py-2 text-[13px] font-semibold text-[#081A12] transition-all duration-150 hover:border-[#2DE8A8] hover:bg-[#2DE8A8] capitalize my-3"
          style={{ boxShadow: "0 0 20px rgba(74,255,196,0.133)" }}
        >
          <span className="text-lg">Sign in</span>
        </Link>
      </Form>
      <p className="text-center text-sm sm:text-base mt-4 text-[#5B5C77]">
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
