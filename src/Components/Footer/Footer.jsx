import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot, FaXTwitter } from "react-icons/fa6"; 
import { FaFacebookF } from "react-icons/fa6"; 
import { FaInstagram } from "react-icons/fa6"; 
import { FaLinkedinIn } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import Logo from "@/assets/mediqueue-logo.png";

const Footer = () => {
  return (
   <div className=" bg-[#14141A]">
    <div className="max-w-11/12 mx-auto py-10 ">
      <div className="grid grid-cols-1 items-center gap-8 lg:gap-x-30  sm:grid-cols-2 lg:grid-cols-4">

        <div className="text-center sm:text-left">
          <div className="flex items-center  justify-center sm:justify-start">
            <Image src={Logo} alt="logo" className="w-10" />
            <p className="font-serif font-extrabold text-[28px] text-[#1B54A4] capitalize">
              medi<span className="text-emerald-700 capitalize">Queue</span>
            </p>
          </div>
          <p className="font-medium text-base text-[#54526E] capitalize my-3 font-sans">
            Simplifying tutor discovery and session booking for students
            everywhere. Bangladesh&apos;s smartest learning platform.
          </p>
          <div className="flex  justify-center sm:justify-start gap-3  sm:max-w-38 ">
            <div className="bg-[#444d63] opacity-45 p-2 border-2 rounded-md border-white/30 hover:border-emerald-500 hover:bg-emerald-500/30 hover:opacity-100 transition-all duration-300 group ">
              <FaXTwitter className="w-6 h-6 text-white/80 group-hover:text-emerald-500 transition-colors duration-300" />
            </div>
            <div className="bg-[#444d63] opacity-45 p-2 border-2 rounded-md border-white/30 hover:border-emerald-500 hover:bg-emerald-500/30 hover:opacity-100 transition-all duration-300 group">
              <FaFacebookF className="w-6 h-6 text-white/80 group-hover:text-emerald-500 transition-colors duration-300"/>
            </div>
            <div className="bg-[#444d63] opacity-45 p-2 border-2 rounded-md border-white/30 hover:border-emerald-500 hover:bg-emerald-500/30 hover:opacity-100 transition-all duration-300 group ">
              <FaInstagram className="w-6 h-6 text-white/80 group-hover:text-emerald-500 transition-colors duration-300 " />
            </div>
            <div className="bg-[#444d63] opacity-45 p-2 border-2 rounded-md border-white/30 hover:border-emerald-500 hover:bg-emerald-500/30 hover:opacity-100 transition-all duration-300 group ">
              <FaLinkedinIn className="w-6 h-6 text-white/80 group-hover:text-emerald-500 transition-colors duration-300" />
            </div>
          </div>
        </div>

        <div className="text-center sm:text-left">
          <h5 className="font-medium text-xl uppercase text-[#9694A1] font-sans">learning</h5>
          <div className="flex flex-col gap-y-1.5 mt-3" >
            <Link href={""} className="text-[#54526E] font-medium text-base capitalize hover:text-white hover:opacity-95 transition-all duration-150 font-sans">Browse tutors</Link>
            <Link href={""} className="text-[#54526E] font-medium text-base capitalize hover:text-white hover:opacity-95 transition-all duration-150 font-sans">Subject categories</Link>
            <Link href={""} className="text-[#54526E] font-medium text-base capitalize hover:text-white hover:opacity-95 transition-all duration-150 font-sans">Group sessions</Link>
            <Link href={""} className="text-[#54526E] font-medium text-base capitalize hover:text-white hover:opacity-95 transition-all duration-150 font-sans">Study resources</Link>
          </div>
        </div>

        <div className="text-center sm:text-left">
          <h5 className="font-medium text-xl uppercase text-[#9694A1] font-sans">contact</h5>
          <div className="flex flex-col gap-y-2 mt-3 ">
            <Link href={""}  className="text-[#54526E] font-medium text-base hover:text-white hover:opacity-95 transition-all duration-150 flex gap-2 items-center justify-center sm:justify-start">
              <IoIosMail  className="min-w-6 min-h-6"/>
              <span className="font-sans">support@mediqueue.io</span>
            </Link>
            <Link href={""}  className="text-[#54526E] font-medium text-base capitalize hover:text-white hover:opacity-95 transition-all duration-150  flex gap-2 items-cente  justify-center sm:justify-start">
              <FaPhoneAlt className="min-w-6 min-h-6" />
              <span className="font-sans">+880 1700 000000</span>
            </Link>
            <Link href={""}  className="text-[#54526E] font-medium text-base capitalize hover:text-white hover:opacity-95 transition-all duration-150  flex gap-2 items-cente justify-center sm:justify-start">
              <FaLocationDot className="min-w-6 min-h-6" />
              <span className="font-sans">Dhaka, Bangladesh</span>
            </Link>
          </div>
        </div>

        <div className="text-center sm:text-left">
          <h5 className="font-medium text-xl uppercase text-[#9694A1] font-sans">platform</h5>
          <div className="flex flex-col gap-y-1.5 mt-3" >
            <Link href={""} className="text-[#54526E] font-medium text-base capitalize hover:text-white hover:opacity-95 transition-all duration-150 font-sans">how it works</Link>
            <Link href={""} className="text-[#54526E] font-medium text-base capitalize hover:text-white hover:opacity-95 transition-all duration-150 font-sans">Become a tutor</Link>
            <Link href={""} className="text-[#54526E] font-medium text-base capitalize hover:text-white hover:opacity-95 transition-all duration-150 font-sans">Privacy policy</Link>
            <Link href={""} className="text-[#54526E] font-medium text-base capitalize hover:text-white hover:opacity-95 transition-all duration-150 font-sans">Terms of service</Link>
          </div>
        </div>
      </div>
<hr className="text-white/20 mt-8 mb-2" />
      <div className=" flex flex-col sm:flex-row sm:justify-between">
        <p className="text-[#54526E] font-medium text-base capitalize font-sans text-center sm:text-start"><small>&copy;2026 MediQueue. All rights reserved.</small></p>
        <p className="text-[#54526E] font-medium text-base capitalize font-sans text-center sm:text-start"><small>Made with care in Bangladesh 🇧🇩</small></p>
      </div>
    </div>
   </div>
  );
};

export default Footer;
