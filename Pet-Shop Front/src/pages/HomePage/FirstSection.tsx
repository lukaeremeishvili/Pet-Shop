import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "./home.css";
import { IAnimalWithCategory } from "../../interfaces/animalWithCategory.interface";

const FirstSection = ({ animals }: { animals: IAnimalWithCategory[] }) => {
  return (
    <>
      {animals.length && (
        <Swiper
          navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
          modules={[Navigation]}
          className="mySwiper"
          loop={true}
        >
          {animals.map((animal) => (
            <SwiperSlide key={animal._uuid}>
              <section className="bg-[#FFF0D9] py-4 h-[660px] w-full mb-16">
                <div className="container flex items-center max-w-[1190px] mx-auto flex-row justify-between">
                  <div className="dogImage relative">
                    <img
                      src={`./src/assets/${animal.image}`}
                      alt={animal.name}
                      className="w-[350px] h-[350px] rounded-full"
                    />

                    <div className="flex justify-center mt-12 space-x-4">
                      <div className="custom-prev cursor-pointer text-[#E58608] text-3xl">
                        ←
                      </div>
                      <p className="description mb-[32px] font-poppins font-normal text-[18px] leading-[32px] max-w-xs">
                        {animal.name}
                      </p>
                      <div className="custom-next cursor-pointer text-[#E58608] text-3xl">
                        →
                      </div>
                    </div>
                  </div>

                  <div className="info pt-[35px]">
                    <h2 className="title mb-[32px] font-poppins font-bold text-[36px] leading-[54px]">
                      {animal.name}
                    </h2>
                    <p className="description mb-[32px] font-poppins font-normal text-[18px] leading-[32px] max-w-xs">
                      {animal.animal_description}
                    </p>
                    <Link
                      to={`/details/${animal._uuid}`}
                      className="py-[9px] px-[24px] bg-[#E58608] font-montserrat font-medium text-[18.66px] text-[#FFFF] rounded-[20px]"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </section>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default FirstSection;
