"use client";
import { Input, Label, Form, Button } from "@heroui/react";
import { FaCheck } from "react-icons/fa6";

import { useState } from "react";
import { toast } from "react-toastify";
import CustomSelect from "../CustomDropDown/CustomSelect";

const AddTutorClient = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectMode, setSelectMode] = useState("");
   const [inAddTutorForm, setInAddTutorForm] = useState(false); // Assuming this component is used in AddTutorForm, adjust as needed

  const onSubmit = async (e) => {
    e.preventDefault();   
    if (!selectedSubject || !selectMode) {
       toast.warning(`Please select a ${!selectedSubject ? "subject" : "Teaching mode"} .`);
      return;
    }
    const formData = new FormData(e.currentTarget);
    const tutor = Object.fromEntries(formData.entries());

    const fullTutorData = {
      ...tutor,
      subject: selectedSubject,
      teachingMode: selectMode,
    };

 const res = await fetch(`${process.env.NEXT_PUBLIC_MEDI_QUEUE_SERVER_URL}/add-tutor`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(fullTutorData),
});

const data = await res.json();
// console.log(data);

if (res.ok) {
  toast.success("Add tutor successfully");
} else {
  const err = await res.json();
  toast.error(err.message || "Failed to add tutor");
}
  };

  return (
    <div className="max-w-11/12 sm:max-w-9/12 md:max-w-8/12 lg:max-w-7/12 mx-auto m-15 ">
      <div>
        <h4 className="font-sans text-[#0DBF82] uppercase font-medium ">
          dashboard
        </h4>
        <h1 className="font-serif text-4xl capitalize my-3">add a new tutor</h1>
        <p className="font-sans font-medium text-lg capitalize text-[#9896AF]">
          fill in all details to list a tutor on the platform
        </p>
      </div>

      <div className="bg-[#13131A] p-7 rounded-2xl border-2 border-white/5 mt-6 ">
        <Form onSubmit={onSubmit} className="mt-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1  ">
              <Label
                htmlFor="input-type-name"
                className="font-sans text-[#81819a] text-base felx gap-x-0 "
              >
                Tutor name <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Input
                id="input-type-name"
                name="name"
                placeholder="Full name"
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921] outline-none
                           focus:border-[#20DE8B] focus:ring-2 focus:ring-[#20DE8B]/30 transition-all duration-200"
                type="text"
                required
              />
            </div>

            <div className="flex flex-col gap-1 ">
              <Label
                htmlFor="input-type-image"
                className="font-sans text-[#81819a] text-base "
              >
                Photo URL
              </Label>
              <Input
                id="input-type-image"
                name="photo"
                placeholder="https://image.com/..."
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921] outline-none
                           focus:border-[#20DE8B] focus:ring-2 focus:ring-[#20DE8B]/30 transition-all duration-200"
                type="url"
                
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            
            <CustomSelect
  value={selectedSubject}
  onChange={(val) => setSelectedSubject(val)}
  options={["All subjects", "Mathematics", "Physics", "Chemistry", "Biology", "English", "History"]}
  inAddTutorForm={inAddTutorForm}
  setInAddTutorForm={setInAddTutorForm}
/>
            
                   <CustomSelect
  value={selectMode}
  onChange={(val) => setSelectMode(val === "Mode" ? "" : val)}
  options={["Mode", "Online", "Offline", "Both"]}
  inAddTutorForm={inAddTutorForm}
  setInAddTutorForm={setInAddTutorForm}
/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1  ">
              <Label
                htmlFor="input-type-available-days"
                className="font-sans text-[#81819a] text-base "
              >
                Available days
              </Label>
              <Input
                id="input-type-available-days"
                name="availableDays"
                placeholder="Sun - Thu"
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921]"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-1 ">
              <Label
                htmlFor="input-type-time"
                className="font-sans text-[#81819a] text-base "
              >
                Time slot
              </Label>
              <Input
                id="input-type-time"
                name="timeSlot"
                placeholder="5:00 PM - 8:00 PM"
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921]"
                type="text"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1 ">
              <Label
                htmlFor="input-type-fee"
                className="font-sans text-[#81819a] text-base felx gap-x-0 "
              >
                Hourly fee (৳) <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Input
                id="input-type-fee"
                name="pricePerHour"
                placeholder="500"
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921]"
                type="number"
                required
              />
            </div>

            <div className="flex flex-col gap-1 ">
              <Label
                htmlFor="input-type-slots"
                className="font-sans text-[#81819a] text-base "
              >
                Total slots
              </Label>
              <Input
                id="input-type-slots"
                name="totalSlots"
                placeholder="20"
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921]"
                type="number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1 ">
              <Label
                htmlFor="input-type-start-date"
                className="font-sans text-[#81819a] text-base "
              >
                Session start date
              </Label>
              <Input
                id="input-type-start-date"
                name="startDate"
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921]"
                type="date"
              />
            </div>

            <div className="flex flex-col gap-1  ">
              <Label
                htmlFor="input-type-location"
                className="font-sans text-[#81819a] text-base felx gap-x-0 "
              >
                Location <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Input
                id="input-type-location"
                name="location"
                placeholder="Dhaka / Chittagong"
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921]"
                type="text"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="flex flex-col gap-1 ">
              <Label
                htmlFor="input-type-institution"
                className="font-sans text-[#81819a] text-base felx gap-x-0 "
              >
                Institution <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Input
                id="input-type-institution"
                name="institution"
                placeholder="University / College"
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921]"
                type="text"
                required
              />
            </div>

            <div className="flex flex-col gap-1  ">
              <Label
                htmlFor="input-type-experience"
                className="font-sans text-[#81819a] text-base "
              >
                Experience
              </Label>
              <Input
                id="input-type-experience"
                name="experience"
                placeholder="e.g. 3 years"
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921]"
                type="text"
              />
            </div>
          </div>

          <hr className="w-full mb-5 mt-8 border-white/10" />

          <Button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#0DBF82] bg-[#0DBF82] px-4 py-2 text-[13px] font-semibold text-[#081A12] transition-all duration-150 hover:border-[#2DE8A8] hover:bg-[#2DE8A8] capitalize cursor-pointer "
            style={{ boxShadow: "0 0 20px rgba(74,255,196,0.133)" }}
          >
            <FaCheck className="text-[#081A12] w-3" />
            submit tutor
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddTutorClient;