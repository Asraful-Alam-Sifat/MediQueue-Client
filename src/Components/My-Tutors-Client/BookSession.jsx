"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  FieldError,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { LuCalendarPlus, LuX } from "react-icons/lu"; 

const BookSession = ({ tutor }) => {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const currentDate = new Date();
  const sessionStartDate = tutor?.startDate ? new Date(tutor.startDate) : null;

  const isBeforeStartDate = sessionStartDate && currentDate < sessionStartDate;
  const isSlotsFull = tutor?.totalSlots === 0;


  const {
      data: session,
  
      refetch,
    } = authClient.useSession();

  

  return (
    <div>
      {/* 1. The Trigger Button */}
      <div className="flex justify-center md:justify-start">
        <button
        onClick={() => document.getElementById("my_modal_5").showModal()}
        className="inline-flex w-fit items-center mt-8 gap-1.5 rounded-2xl border border-[#0DBF82] bg-[#0DBF82] px-5 py-2 text-lg font-semibold text-[#081A12] transition-all duration-150 hover:border-[#2DE8A8] hover:bg-[#2DE8A8] capitalize "
        style={{ boxShadow: "0 0 20px rgba(74,255,196,0.133)" }}
      >
        <LuCalendarPlus />
        Book session
      </button>
      </div>

      {/* 2. The Modal Markup */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle ">
       
        <div className="modalbook  modal-box  text-white bg-[#13131A]/90 relative  border border-white/10 ">
         
          <div className="modal-action absolute  right-4 top-5 mt-0">
            <form method="dialog ">
              <button className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-white text-xl">
                <LuX />
              </button>
            </form>
          </div>

          {/* Modal Content */}
          <div>
            <h1 className="font-bold text-lg flex items-center gap-2 ">
              <LuCalendarPlus />
              <span>Book a session</span>
            </h1>

            <hr className="text-white/5 border my-5" />

            <Card className="bg-transparent">
              <Card.Content>

               {isSlotsFull ? (
  // 1. If slots are 0, ONLY show this badge, ignoring all date logic
  <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-500 text-sm p-3 rounded-lg mb-4">
    <span className="text-base">🚫</span>
    <p>Booking closed — all available slots are full.</p>
  </div>
) : isBeforeStartDate ? (
  // 2. If slots are available, check if it's too early
  <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-sm p-3 rounded-lg mb-4">
    <span className="text-base">⚠️</span>
    <p>Booking not open yet — session hasn't started.</p>
  </div>
) : (
  // 3. If slots are available AND the session has started
  <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-500 text-sm p-3 rounded-lg mb-4">
    <span className="text-base">⚠️</span>
    <p>Session already started — booking is open.</p>
  </div>
)}

                <form action="">
                  <TextField
                    className="w-full flex flex-col gap-1  mt-4"
                    Required
                    //  isInvalid={!!errors.name}
                  >
                    <Label
                      htmlFor="input-type-student-name"
                      className="font-sans text-[#81819a] text-base flex gap-x-0"
                    >
                      Student Name
                    </Label>
                    <Input
                      id="input-type-student-name"
                      placeholder="Enter your full name"
                      type="text"
                      //    {...register("name", {
                      //      required: "Username field is required",
                      //    })}
                      className="w-full border border-white/10 rounded-xl text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#13131A]/90 focus:border-[#20DE8B] focus:ring-2 focus:ring-[#20DE8B]/30 transition-all duration-200"
                    />

                    {/* <FieldError className="text-xs text-red-300/80 mt-1">
                                    {errors.name?.message}
                                    </FieldError> */}
                  </TextField>

                  <TextField
                    className="w-full flex flex-col gap-1  mt-4"
                    Required
                    //  isInvalid={!!errors.phone}
                  >
                    <Label
                      htmlFor="input-type-phone-number"
                      className="font-sans text-[#81819a] text-base flex gap-x-0"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="input-type-phone-number"
                      placeholder="+ 8801XXXXXXXXX"
                      type="number"
                      //    {...register("phone", {
                      //      required: "Phone number field is required",
                      //    })}
                      className="w-full border border-white/10 rounded-xl text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#13131A]/90 focus:border-[#20DE8B] focus:ring-2 focus:ring-[#20DE8B]/30 transition-all duration-200  "
                    />

                    {/* <FieldError className="text-xs text-red-300/80 mt-1">
                               {errors.phone?.message}
                             </FieldError> */}
                  </TextField>

                  {/* --- 2. Tutor (Auto-filled) Field --- */}
  <TextField className="w-full flex flex-col gap-1 mt-4">
    <Label className="font-sans text-[#81819a] text-base flex gap-x-0">
      Tutor (auto-filled)
    </Label>
    <Input
      type="text"
      id="auto-filled-tutor"
      // Use standard defaultValue. Read the name right from the tutor prop!
      placeholder={tutor?.name || "Dr. Aisha Rahman"} 
      defaultValue={tutor?.name || "Dr. Aisha Rahman"}
      disabled // Makes it un-editable just like the screenshot layout
      className="w-full border border-white/10 rounded-xl text-white/50 bg-[#13131A]/90 px-4 py-2 opacity-60 cursor-not-allowed"
    />
  </TextField>

  {/* --- 3. Your Email (Auto-filled) Field --- */}
  <TextField className="w-full flex flex-col gap-1 mt-4">
    <Label className="font-sans text-[#81819a] text-base flex gap-x-0">
      Your email (auto-filled)
    </Label>
    <Input
      type="email"
      id="auto-filled-email"
      // Replace with logged-in user email variable if you have auth context setup
      placeholder= {session?.user?.email || "Enter your email"}
      defaultValue={session?.user?.email || "Enter your email"}
      disabled
      className="w-full border border-white/10 rounded-xl text-white/50 bg-[#13131A]/90 px-4 py-2 opacity-60 cursor-not-allowed"
    />
  </TextField>

                  <Button
                    type="submit"
                    className="w-full rounded-[10px] bg-[#0DBF82] hover:bg-[#2DE8A8] text-[#081A12] font-semibold text-lg capitalize mt-8 shadow-[0_0_20px_rgba(74,255,196,0.15)] transition-all duration-150"
                  >
                    Book Session
                  </Button>
                </form>
              </Card.Content>
            </Card>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BookSession;
