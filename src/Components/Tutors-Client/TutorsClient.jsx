"use client";
import React, { useState, useEffect } from "react";
import TutorCard from "@/Components/HOME/FeaturedTutors/TutorCard";
import CustomSelect from "@/Components/CustomDropDown/CustomSelect";

const TutorsClient = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const url =
      `${process.env.NEXT_PUBLIC_MEDI_QUEUE_SERVER_URL}/tutors` ||
      "http://localhost:5000/featured-tutors";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
        setLoading(false);
      })
      .catch((err) => {
       
        setLoading(false);
      });
  }, []);

  const filteredTutors = tutors.filter((tutor) => {
    const matchesName = tutor.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSubject =
      !selectedSubject || tutor.subject === selectedSubject;
    const matchesMode =
      !selectedMode ||
      tutor.teachingMode?.toLowerCase() === selectedMode.toLowerCase();
    const matchesDateFrom = !dateFrom || tutor.availableFrom >= dateFrom;
    const matchesDateTo = !dateTo || tutor.availableTo <= dateTo;

    return (
      matchesName &&
      matchesSubject &&
      matchesMode &&
      matchesDateFrom &&
      matchesDateTo
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#131319] flex items-center justify-center text-white">
        <p className="text-center py-10">
          <span className="loading loading-dots loading-xl"></span>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div>
        <div className="mb-12 bg-[#131319]">
          <div className="max-w-11/12 mx-auto p-8 justify-between flex items-center gap-y-5 mb-10 flex-col sm:flex-row">
            <div className="w-full space-x-5 flex flex-col sm:flex-row gap-y-5">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 w-full sm:max-w-[250px] bg-[#191921] border border-white/10 rounded-lg
                           text-[#ccc] placeholder-[#666] text-sm px-4 py-2.5 outline-none
                           focus:border-[#20DE8B] focus:ring-2 focus:ring-[#20DE8B]/30 transition-all duration-200"
              />
              <div className="flex justify-around gap-5">
                <CustomSelect
                  value={selectedSubject || "All subjects"}
                  onChange={(val) =>
                    setSelectedSubject(val === "All subjects" ? "" : val)
                  }
                  options={[
                    "All subjects",
                    "Mathematics",
                    "Physics",
                    "Chemistry",
                    "Biology",
                    "English",
                    "History",
                  ]}
                  inAddTutorForm={true}
                />

                <CustomSelect
                  value={selectedMode || "Mode"}
                  onChange={(val) => setSelectedMode(val === "Mode" ? "" : val)}
                  options={["Mode", "Online", "Offline", "Both"]}
                  inAddTutorForm={true}
                />
              </div>
            </div>
            <span className="text-[#888] text-sm whitespace-nowrap">
              {filteredTutors.length} tutors
            </span>
          </div>
        </div>
        <div className="max-w-10/12 mx-auto px-4 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor) => (
              <TutorCard key={tutor._id || tutor.id} tutor={tutor} />
            ))
          ) : (
            <p className="text-[#666] col-span-3 text-center py-20">
              No tutors match your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorsClient;
