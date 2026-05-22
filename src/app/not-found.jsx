import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <div className=" flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
        <h2 className="text-6xl font-bold text-red-500 mb-4">404</h2>
        <p className="font-sans text-xl mb-6 text-gray-400 cap">
          Oops! The page you are looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#0DBF82] bg-[#0DBF82] px-5 py-3 text-[13px] font-semibold text-[#081A12] transition-all duration-150 hover:border-[#2DE8A8] hover:bg-[#2DE8A8] capitalize"
          style={{ boxShadow: "0 0 20px rgba(74,255,196,0.133)" }}
        >
          <span className="font-sans text-xl font-bold">Return Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
