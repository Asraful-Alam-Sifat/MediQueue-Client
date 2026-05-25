"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Card, Input, Label, TextField } from "@heroui/react";
import { LuCalendarPlus, LuX } from "react-icons/lu";
import { toast } from "react-toastify";

const BookSession = ({ tutor }) => {
  const { data: session } = authClient.useSession();
  
  const router = useRouter();
  const [studentName, setStudentName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  

  

  const currentDate = new Date();
  const sessionStartDate = tutor?.startDate ? new Date(tutor.startDate) : null;
  const isBeforeStartDate = sessionStartDate && currentDate < sessionStartDate;
  const isSlotsFull = tutor?.totalSlots === 0;

  const isBookingDisabled = isSlotsFull || isBeforeStartDate;

  const generateToken = () => {
    const randomChars = Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase();
    return `MQ-${randomChars}`;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!session || !session.user) {
      document.getElementById("my_modal_5").close();

      router.push("/login");
      return;
    }

    if (isBookingDisabled) return;
    setIsSubmitting(true);

    const bookingPayload = {
      tutorName: tutor?.name || "Unknown Tutor",
      studentName: studentName,
      email: session.user.email,
      phone: phoneNumber,
      token: generateToken(),
      status: "pending",
      tutorId: tutor?._id,
      subject: tutor?.subject || "General",
    };

    try {
      // console.log("Sending data to booking API:", bookingPayload);

      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      const responseData = await response.json();

      if (response.ok && responseData.insertedId) {
        toast.success(
          `Booking Successful! Your token is ${bookingPayload.token}`,
        );
        setStudentName("");
        setPhoneNumber("");
        document.getElementById("my_modal_5").close();
      } else {
        throw new Error(responseData.message || "Failed to submit booking");
      }
    } catch (error) {
      // console.error("Booking failed:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session){
    router.push("/login");
    return;
  }
  return (
    <div>
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

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle ">
        <div className="modalbook modal-box text-white bg-[#13131A]/90 relative border border-white/10 ">
          <div className="modal-action absolute right-4 top-5 mt-0">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-white text-xl">
                <LuX />
              </button>
            </form>
          </div>

          <div>
            <h1 className="font-bold text-lg flex items-center gap-2 ">
              <LuCalendarPlus />
              <span>Book a session</span>
            </h1>
            <hr className="text-white/5 border my-5" />
            <Card className="bg-transparent">
              <Card.Content>
                {isSlotsFull ? (
                  <div className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/30 text-red-500 text-sm p-3 rounded-lg mb-4">
                    <span className="text-base">🚫</span>
                    <p>
                      This session is fully booked. You can’t join at the
                      moment.
                    </p>
                  </div>
                ) : isBeforeStartDate ? (
                  <div className="flex items-center justify-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-sm p-3 rounded-lg mb-4">
                    <span className="text-base">⚠️</span>
                    <p>Booking not open yet — session hasn't started.</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-500 text-sm p-3 rounded-lg mb-4">
                    <span className="text-base">⚠️</span>
                    <p>Session started — booking is open.</p>
                  </div>
                )}

                <form onSubmit={handleBookingSubmit}>
                  <TextField className="w-full flex flex-col gap-1 mt-4">
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
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full border border-white/10 rounded-xl text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#13131A]/90 focus:border-[#20DE8B] focus:ring-2 focus:ring-[#20DE8B]/30 transition-all duration-200"
                    />
                  </TextField>

                  <TextField className="w-full flex flex-col gap-1 mt-4">
                    <Label
                      htmlFor="input-type-phone-number"
                      className="font-sans text-[#81819a] text-base flex gap-x-0"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="input-type-phone-number"
                      placeholder="+ 8801XXXXXXXXX"
                      type="text"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full border border-white/10 rounded-xl text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#13131A]/90 focus:border-[#20DE8B] focus:ring-2 focus:ring-[#20DE8B]/30 transition-all duration-200"
                    />
                  </TextField>

                  <TextField className="w-full flex flex-col gap-1 mt-4">
                    <Label className="font-sans text-[#81819a] text-base flex gap-x-0">
                      Tutor (auto-filled)
                    </Label>
                    <Input
                      type="text"
                      id="auto-filled-tutor"
                      placeholder={tutor?.name || "Dr. Aisha Rahman"}
                      defaultValue={tutor?.name || "Dr. Aisha Rahman"}
                      disabled
                      className="w-full border border-white/10 rounded-xl text-white/50 bg-[#13131A]/90 px-4 py-2 opacity-60 cursor-not-allowed"
                    />
                  </TextField>

                  <TextField className="w-full flex flex-col gap-1 mt-4">
                    <Label className="font-sans text-[#81819a] text-base flex gap-x-0">
                      Your email (auto-filled)
                    </Label>
                    <Input
                      type="email"
                      id="auto-filled-email"
                      placeholder={session?.user?.email || "Enter your email"}
                      defaultValue={session?.user?.email || "Enter your email"}
                      disabled
                      className="w-full border border-white/10 rounded-xl text-white/50 bg-[#13131A]/90 px-4 py-2 opacity-60 cursor-not-allowed"
                    />
                  </TextField>

                  <Button
                    type="submit"
                    disabled={isBookingDisabled || isSubmitting}
                    className={`w-full rounded-[10px] text-lg font-semibold capitalize mt-8 transition-all duration-150 shadow-[0_0_20px_rgba(74,255,196,0.15)]
                      ${
                        isBookingDisabled
                          ? "bg-gray-700 text-gray-400 opacity-50 cursor-not-allowed shadow-none hover:bg-gray-700"
                          : "bg-[#0DBF82] hover:bg-[#2DE8A8] text-[#081A12]"
                      }`}
                  >
                    {isSubmitting
                      ? "Processing..."
                      : isSlotsFull
                        ? "Booking Closed"
                        : isBeforeStartDate
                          ? "Booking Not Open"
                          : "Book Session"}
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
