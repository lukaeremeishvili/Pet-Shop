import React, { useState, useEffect } from "react";
import Dog from "./HomeImages/Rectangle 2286.svg";
import Dog1 from "./HomeImages/hn.png";
import Dog2 from "./HomeImages/hn1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "./home.css";

interface Describe {
  id: number;
  img: string;
  title: string;
  description: string;
}

const dogData: Describe[] = [
  {
    id: 1,
    img: Dog,
    title: "Puppy",
    description:
      "Dog: Loyal, friendly, and playful, dogs are known for being affectionate companions to humans and are often referred to as 'man's best friend.'",
  },
  {
    id: 2,
    img: Dog1,
    title: "Labrador Retriever",
    description:
      "Labradors are one of the most popular family dogs due to their affectionate nature and intelligence. They need daily exercise to stay healthy and happy. They also love water and are excellent swimmers!",
  },
  {
    id: 3,
    img: Dog2,
    title: "German Shepherd",
    description:
      "German Shepherds are known for their intelligence and versatility. They excel in police work, search-and-rescue, and service dog roles. They require early socialization and consistent training to thrive.",
  },
];

const FirstSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const storedIndex = localStorage.getItem("activeSlide");
    return storedIndex ? parseInt(storedIndex, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem("activeSlide", activeIndex.toString());
  }, [activeIndex]);

  return (
    <>
      <Swiper
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        modules={[Navigation]}
        className="mySwiper"
        loop={true}
        initialSlide={activeIndex}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {dogData.map((dog) => (
          <SwiperSlide key={dog.id}>
            <section className="bg-[#FFF0D9] py-4 h-[660px] w-full mb-16">
              <div className="container flex items-center max-w-[1190px] mx-auto flex-row justify-between">
                <div className="dogImage relative">
                  <img src={dog.img} alt={dog.title} className="w-[400px] h-[450px] " />
                  
                  {/* ნავიგაციის ღილაკები სურათის ქვემოთ */}
                  <div className="flex justify-center mt-12 space-x-4 ">
                    <div className="custom-prev cursor-pointer text-[#E58608] text-3xl">←</div>
                    <p className="description mb-[32px] font-poppins font-normal text-[18px] leading-[32px] max-w-xs">
                    {dog.title}
                  </p>
                    <div className="custom-next cursor-pointer text-[#E58608] text-3xl">→</div>
                  </div>
                </div>

                <div className="info pt-[35px]">
                  <h2 className="title mb-[32px] font-poppins font-bold text-[36px] leading-[54px]">
                    {dog.title}
                  </h2>
                  <p className="description mb-[32px] font-poppins font-normal text-[18px] leading-[32px] max-w-xs">
                    {dog.description}
                  </p>
                  <a
                    href="#"
                    className="py-[9px] px-[24px] bg-[#E58608] font-montserrat font-medium text-[18.66px] text-[#FFFF] rounded-[20px]"
                  >
                    Buy me
                  </a>
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default FirstSection;
