const processSteps = [
  {
    id: 1,
    title: "Register",
    description: "Create your free account in under a minute",
  },
  {
    id: 2,
    title: "Browse",
    description: "Search tutors by subject, mode, and schedule",
  },
  {
    id: 3,
    title: "Book",
    description: "Confirm your slot — system prevents all conflictse",
  },
  {
    id: 4,
    title: "Learn",
    description: "Get your session token and join your class",
  },
];

const SessionProcess = () => {
  return (
    <div className="bg-[#131319] py-15 border-t border-b border-x border-t-white/5 border-b-white/10 border-x-white/5  hover:border-b-[#04ffc4]/10 hover:border-x-white/10 transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-[#04ffc4]/5 ">
      <div className="max-w-11/12 mx-auto  ">
        <div>
          <h3 className="font-sans text-[#2DE8A8] uppercase font-medium ">
            process
          </h3>
          <h1 className="font-serif text-4xl capitalize my-3">
            four steps to your first session
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-7 ">
          {processSteps.map((process) => {
            return (
              <div
                key={process.id}
                className="group relative bg-[#13131A]/80 rounded-xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#4affc4]/20 hover:-translate-y-1 px-12 py-10"
              >
                <div className="flex justify-center mb-7">
                  <div className="relative w-12 h-12 rounded-full inline-flex items-center justify-center border-2 border-[#0DBF82]/40 bg-[#13131A] font-bold text-[#4AFEC3] text-xl overflow-visible transition-all duration-300 group-hover:bg-[#0DBF82]/10 group-hover:border-[#0DBF82]/40">
                    <div className="absolute inset-0 rounded-full bg-[#04ffc4] opacity-20 blur-md z-0 pointer-events-none"></div>

                    <span className="relative z-10 font-extrabold">
                      {process.id}
                    </span>
                  </div>
                </div>
                <h3 className="font-sans font-medium text-2xl text-center ">
                  {process.title}
                </h3>
                <p className="font-sans font-normal text-base text-center mt-2  text-[#5B5C77] ">
                  {process.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SessionProcess;
