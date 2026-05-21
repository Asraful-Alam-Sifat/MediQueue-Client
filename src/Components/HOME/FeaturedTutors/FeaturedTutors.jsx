"use client";
import Link from "next/link";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

import { useEffect, useState } from "react";
import TutorCard from "./TutorCard";

const FeaturedTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_MEDI_QUEUE_LIVE_URL}/featured-tutors` || "http://localhost:5000/featured-tutors")
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p className="text-center py-10">
        <span className="loading loading-dots loading-xl"></span>
      </p>
    );

  return (
    <div className="max-w-11/12 mx-auto py-15">
      <div>
        <h3 className="font-sans text-[#2DE8A8] uppercase font-medium ">
          featured
        </h3>
        <h1 className="font-serif text-4xl capitalize my-3">
          Available tutors
        </h1>
        <p className="font-sans font-medium text-base capitalize text-[#9896AF]">
          6 of our top-rated educators
        </p>
        <div className="flex justify-end">
          <Link
            href={"/tutors"}
            className="flex items-center gap-1.5 text-[#8F8BA7] opacity-80 hover:btn hover:bg-[#0C0C10] transition-all duration-150 rounded-xl"
          >
            View all
            <HiOutlineArrowLongRight />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-7 ">
        {tutors.map((tutor) => (
          <TutorCard key={tutor._id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedTutors;
