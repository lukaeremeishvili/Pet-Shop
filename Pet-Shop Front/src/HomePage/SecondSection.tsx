import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/scrollbar";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";
import Dog1 from "./HomeImages/frenchbulldog.jpg";
import Dog2 from "./HomeImages/labrador.jpeg";
import Dog3 from "./HomeImages/goldenone.jpeg";
import Dog4 from "./HomeImages/germanshephard.webp";
import Dog5 from "./HomeImages/poodle.webp";
import Dog6 from "./HomeImages/American-pit-bull-terrier.webp";
interface Cards {
id:number
img:string
main:string
alt:string
}
const SlideDatas:Cards[] = [
    {
        id: 1,
        img: Dog1,
        main: "French Bulldog: Small, playful, and affectionate, great for apartments.",
        alt:"French Bulldog"
    },
    {
        id: 2,
        img: Dog2,
        main: "Labrador Retriever: Friendly, intelligent , ideal for families.",
        alt:"Labrador Retriever"
    },
    {
        id: 3,
        img: Dog3,
        main: "Golden Retriever: Loyal, loving , perfect for companionship.",
        alt:"Golden Retriever"
    },
    {
        id: 4,
        img: Dog4,
        main: "German Shepherd: Protective,often used in police work.",
        alt:"German Shepherd"
    },
    {
        id: 5,
        img: Dog5,
        main: "Poodle: Smart, hypoallergenic, and comes in different sizes",
         alt:"Poodle"
    },
    {
      id: 6,
      img: Dog6,
      main: "Pit Bulls are strong dogs that are one of the well-known breeds. They are known for their energy",
       alt:"Pit Bull"
  },
    
   
]
const SecondSection: React.FC = () => {
  return (
    <section className="section2">
      <h1 className="text-3xl font-semibold text-black leading-[54px] tracking-[0%] text-center">
        Popular Animals
      </h1>
      <p className="font-poppins font-normal text-[18px] leading-[32px] tracking-[0%] text-center text-black mb-16">
        Top-6
      </p>
      <div className="max-w-[867px] mx-auto">
      <Swiper
  loop={true} 
  slidesPerView={3}
  slidesPerGroup={3}
  centeredSlides={false}
  spaceBetween={0}
  grabCursor={true}
  keyboard={{ enabled: true }}

  scrollbar={{ hide: false }}
  navigation={true}
  pagination={{ clickable: true }}
  modules={[Keyboard, Scrollbar, Navigation, Pagination]}
  className="mySwiper"
>
          {SlideDatas.map((card)=>(
 <SwiperSlide key={card.id}>
 <div className="w-[237px] h-[326px] rounded-lg overflow-hidden bg-[#FBFBFB] shadow-[0px_10px_20px_0px_#0000001A]">
   <img src={card.img} alt={card.alt} className="w-full h-48 object-cover rounded-bl-2xl rounded-br-2xl" />
   <div className="p-4">
     <h1 className="font-poppins font-medium text-[16px] leading-[24px] tracking-[0%] text-center text-black mt-3">
      {card.main}
     </h1>
   </div>
 </div>
</SwiperSlide>
          ))}
         
         
      
        </Swiper>
      </div>
    </section>
  );
};

export default SecondSection;


