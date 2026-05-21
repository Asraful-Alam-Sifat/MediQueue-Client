"use client";
import React, { useState, useEffect } from "react";
import TutorCard from "@/Components/FeaturedTutors/TutorCard";

const TutorsPage = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_MEDI_QUEUE_SERVER_URL}/tutors`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tutors:", err);
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
    <div className="min-h-screen  text-white ">
      <div>
        <div className="mb-12 bg-[#131319]">
          <div className="max-w-11/12 mx-auto p-8 justify-between flex items-center gap-y-5 mb-10 flex-col sm:flex-row">


            <div className="w-full space-x-5 flex flex-col sm:flex-row gap-y-5">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 w-full sm:max-w-[250px] bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg
                           text-[#ccc] placeholder-[#666] text-sm px-4 py-2.5 outline-none
                           focus:border-[#555]"
              />

              <div className="flex justify-around gap-5">
                <select
                id='subject'
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-[#ccc]
                           text-sm px-4 py-2.5 outline-none cursor-pointer appearance-none
                           focus:border-[#555]"
              >
                <option value="">All subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
                <option value="History">History</option>
              </select>

              {/* Mode dropdown */}
              <select
              id='mode'
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-[#ccc]
                           text-sm px-4 py-2.5 outline-none cursor-pointer appearance-none
                           focus:border-[#555]"
              >
                <option value="">Any mode</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Both">Both</option>
              </select>
              </div>
            </div>


            <span className="text-[#888] text-sm whitespace-nowrap ">
              {filteredTutors.length} tutors
            </span>
          </div>
        </div>

        {/* Grid display layout */}
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

export default TutorsPage;
