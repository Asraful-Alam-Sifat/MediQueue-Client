import Logo from '@/assets/mediqueue-logo.png'
import Image from 'next/image';
import Link from 'next/link';

const NavBar = () => {
    return (
         <div className="navbar sticky top-0 z-50 border-b border-white/5"
  style={{ background: 'rgba(12, 12, 16, 0.85)', backdropFilter: 'blur(16px)' }}>
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>tutors</li>
        <li>add tutor</li>
        <li>my tutors</li>
        <li>my sessions</li>
      </ul>
    </div>
    <div className='flex items-center gap-1'>
        <Image src={Logo} alt='logo' className='w-12'/>
        <h1 className='font-extrabold text-3xl text-[#1B54A4] serif'>Medi<span className='text-emerald-700'>Queue</span></h1>
    </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li>tutors</li>
        <li>add tutor</li>
        <li>my tutors</li>
        <li>my sessions</li>
    </ul>
  </div>
  <div className="navbar-end gap-3">
    <Link href={''} className='btn btn-outline'>sign in</Link>
    <Link href={''} className='btn btn-outline'>register free</Link>
  </div>
</div>
    );
};

export default NavBar;