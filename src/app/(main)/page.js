import FeaturedTutors from "@/Components/FeaturedTutors/FeaturedTutors";
import HeroBanner from "@/Components/HeroBanner/HeroBanner";
import Platform from "@/Components/Platform/Platform";
import SessionProcess from "@/Components/Session-Process/SessionProcess";



export default function Home() {
  return (
   <div className="">
    <HeroBanner/>
    <FeaturedTutors/>
    <SessionProcess/>
    <Platform/>
   </div>
  );
}
