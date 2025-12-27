import Image from "next/image";
import Hero from "@/components/Hero";
import NewArrival from "@/components/NewArrival";
import PromoCarousel from "@/components/PromoCarousal";

export default function Home() {
  return (
   <div>
     <Hero />
     <NewArrival />
     <PromoCarousel/>
   </div>
  );
}
