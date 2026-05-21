import Image from "next/image";
import Logo from "@/assets/mediqueue-logo.png";
import { TbBrandGoogle } from "react-icons/tb";
import { Form, Input, Label } from "@heroui/react";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="bg-[#121219] max-w-7/12 xl:max-w-4/12  mx-auto my-15 rounded-2xl border-2 border-white/5 p-10 py-10">
      <div>
        <div className="flex items-center mx-auto  justify-center ">
          <Image src={Logo} alt="logo" className="w-10" />
          <p className="font-serif font-extrabold text-[28px] text-[#1B54A4] capitalize">
            medi<span className="text-[#0DBF82] capitalize">Queue</span>
          </p>
        </div>

        <div>
          <h3 className="font-serif font-bold text-xl text-center ">
            Welcome back
          </h3>
          <p className="font-sans text-[#5B5C77] text-center ">
            Sign in to continue learning
          </p>
        </div>

        <div>
          <button
            //   onClick={handleGoogleLogin}
            type="button"
            className="btn  mx-auto flex items-center justify-center gap-2 border-gray-400 hover:bg-gray-100 text-black my-6"
          >
            <TbBrandGoogle className="text-red-500" />
            Continue with Google
          </button>
        </div>
      </div>


      <div className="grid grid-cols-5 items-center justify-evenly gap-4 my-6">
        <span className="bg-[#5B5C77]/35 h-[1px] w-full col-span-2"></span>
        <span className="col-span-1 w-fit text-xm font-light text-center text-[#5B5C77] capitalize">or sign in with email</span>
        <span className="bg-[#5B5C77]/35 h-[1px] w-full col-span-2"></span>
      </div>

      <Form className="flex  flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="input-type-email">Email</Label>
          <Input
            id="input-type-email"
            placeholder="jane@example.com"
            type="email"
            className='w-full h-11'
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between mb-1 mt-3">
            <Label htmlFor="input-type-password">Password</Label>{" "}
            <p className="font-sans text-[#2DE8A8] font-medium ">Forgot?</p>
          </div>
          <Input
            id="input-type-password"
            placeholder="••••••••"
            type="password"
            className='w-full h-11'
          />
        </div>
        <Link
          href={"/login"}
          className="inline-flex items-center w-full gap-1.5 rounded-[10px] border border-[#0DBF82] bg-[#0DBF82] px-4 py-2 text-[13px] font-semibold text-[#081A12] transition-all duration-150 hover:border-[#2DE8A8] hover:bg-[#2DE8A8] capitalize my-3"
          style={{ boxShadow: "0 0 20px rgba(74,255,196,0.133)" }}
        >
          Sign in
        </Link>
      </Form>
      <p className="text-center">
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
