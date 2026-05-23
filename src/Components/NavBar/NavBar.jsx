import Logo from "@/assets/mediqueue-logo.png";
import Image from "next/image";
import Link from "next/link";
import NavBarProfileIcon from "./NavBar-Profile-Icon/NavBarProfileIcon";
import HamBurgerItem from "./HamBurger-Item/HamBurgerItem";


const NavBar =  () => {
  

  return (
    <div
      className="navbar sticky top-0 z-50 border-b bg-transparent border-white/5 sm:px-10 py-4 flex-col sm:flex-row gap-y-4 justify-between"
      style={{
        background: "rgba(12, 12, 16, 0.85)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* navbar-start */}
      <div className="navbar-start w-full sm:w-auto flex flex-row items-center justify-center sm:justify-start gap-2">
        
        <HamBurgerItem/>

        <Link href={"/"} className="flex items-end gap-1">
          <Image src={Logo} alt="logo" className="w-15" />
          <h1 className="font-serif font-extrabold text-4xl text-[#1B54A4]">
            Medi<span className="text-[#0DBF82]">Queue</span>
          </h1>
        </Link>
      </div>

      {/* navbar-center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal space-x-9 px-1 text-xl">
          <Link
            href={"/tutors"}
            className="text-white/45 hover:text-white transition-all duration-150 text-xl capitalize"
          >
            <li className="font-sans">tutors</li>
          </Link>
          <Link
            href={"/add-tutor"}
            className="text-white/45 hover:text-white transition-all duration-150 text-xl capitalize"
          >
            <li className="font-sans">add tutor</li>
          </Link>
          <Link
            href={"/my-tutors"}
            className="text-white/45 hover:text-white transition-all duration-150 text-xl capitalize"
          >
            <li className="font-sans">my tutors</li>
          </Link>
          <Link
            href={"/sessions"}
            className="text-white/45 hover:text-white transition-all duration-150 text-xl capitalize"
          >
            <li className="font-sans">my sessions</li>
          </Link>
        </ul>
      </div>

      <NavBarProfileIcon />
    </div>
  );
};

export default NavBar;
