import FeaturedTutors from "@/Components/HOME/FeaturedTutors/FeaturedTutors";
import HeroBanner from "@/Components/HOME/HeroBanner/HeroBanner";
import Platform from "@/Components/HOME/Platform/Platform";
import SessionProcess from "@/Components/HOME/Session-Process/SessionProcess";



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
