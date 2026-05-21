import FeaturedTutors from "@/Components/FeaturedTutors/FeaturedTutors";
import HeroBanner from "@/Components/HeroBanner/HeroBanner";
import SessionProcess from "@/Components/Session-Process/SessionProcess";



export default function Home() {
  return (
   <div className="">
    <HeroBanner/>
    <FeaturedTutors/>
    <SessionProcess/>
   </div>
  );
}
