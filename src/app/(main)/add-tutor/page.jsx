import { Input, Label, Select, ListBox, Form} from "@heroui/react";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";
import SubjectSelect from "@/Components/Sub-Select/SubjectSelect";
import SelectTeachingMode from "@/Components/Select-Teaching-mode/SelectTeachingMode";



const AddTutor = () => {
  return (
    <div className="max-w-11/12 sm:max-w-9/12 md:max-w-8/12 lg:max-w-7/12 mx-auto m-15 ">
      <div>
        <h4 className="font-sans text-[#0DBF82] uppercase font-medium ">
          dashboard
        </h4>
        <h1 className="font-serif text-4xl capitalize my-3">add a new tutor</h1>
        <p className="font-medium text-lg capitalize text-[#9896AF]">
          fill in all details to list a tutor on the platform
        </p>
      </div>

      <div className="bg-[#13131A] p-7 rounded-2xl border-2 border-white/5 mt-6 ">

         <Form className="mt-4 ">

          

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
             <div className="flex flex-col gap-1  ">
              <Label htmlFor="input-type-name  " className="font-sans  text-[#70708E] text-base ">Tutor name</Label>
              <Input
                id="input-type-name"
                placeholder="Full name"
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921]"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-1 ">
              <Label htmlFor="input-type-image" className="font-sans text-[#70708E] text-base ">Photo URL</Label>
              <Input
                id="input-type-image"
                placeholder="https://image.com/..."
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921]"
                type="text"
              />
            </div>
      </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

{/* <SubjectSelect/> */}
<SubjectSelect />
<SelectTeachingMode/>
</div>


             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1  ">
              <Label htmlFor="input-type-available-days" className="font-sans text-[#70708E] text-base ">Available days</Label>
              <Input
                id="input-type-available-days"
                placeholder="Sun - Thu"
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921]"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-1 ">
              <Label htmlFor="input-type-time" className="font-sans text-[#70708E] text-base ">Time slot</Label>
              <Input
                id="input-type-time"
                placeholder="5:00 PM - 8:00 PM"
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921]"
                type="text"
              />
            </div>
        </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1 ">
              <Label htmlFor="input-type-fee" className="font-sans text-[#70708E] text-base ">Hourly fee (৳)</Label>
              <Input
                id="input-type-fee"
                placeholder="500"
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921]"
                type="number"
              />
            </div>
        

         
            <div className="flex flex-col gap-1 ">
              <Label htmlFor="input-type-slots" className="font-sans text-[#70708E] text-base ">Total slots</Label>
              <Input
                id="input-type-slots"
                placeholder="20"
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921]"
                type="number"
              />
            </div>
         </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
             <div className="flex flex-col gap-1 ">
              <Label htmlFor="input-type-start-date" className="font-sans text-[#70708E] text-base ">Session start date</Label>
              <Input
                id="input-type-start-date"
                
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921]"
                type="date"
              />
            </div>

            <div className="flex flex-col gap-1  ">
              <Label htmlFor="input-type-location" className="font-sans text-[#70708E] text-base ">Location</Label>
              <Input
                id="input-type-location"
                placeholder="Dhaka / Chittagong"
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921]"
                type="text"
              />
            </div>
         </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <div className="flex flex-col gap-1 ">
              <Label htmlFor="input-type-institution" className="font-sans text-[#70708E] text-base ">Institution</Label>
              <Input
                id="input-type-institution"
                placeholder="University / College"
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921]"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-1  ">
              <Label htmlFor="input-type-experience" className="font-sans text-[#70708E] text-base ">Experience</Label>
              <Input
                id="input-type-experience"
                placeholder="e.g. 3 years"
                className="w-full border border-white/10 rounded-lg text-white placeholder:text-[#4c4b6b] focus:outline-none bg-[#191921]"
                type="text"
              />
            </div>
      </div>
          

        </Form>

        <hr className="mb-5 mt-8 text-white/10 " />

        <Link
          href={""}
          className="inline-flex items-center gap-1 rounded-[10px] border border-[#0DBF82] bg-[#0DBF82] px-4 py-2 text-[13px] font-semibold text-[#081A12] transition-all duration-150 hover:border-[#2DE8A8] hover:bg-[#2DE8A8] capitalize "
          style={{ boxShadow: "0 0 20px rgba(74,255,196,0.133)" }}
        >
          <FaCheck />
          submit tutor
        </Link>
      </div>
    </div>
  );
};

export default AddTutor;
