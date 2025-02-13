import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";

interface Animal {
  _uuid: string;
  image: string;
  name: string;
  animal_description: string;
  isPopular: boolean;
}

interface ApiResponse {
  items: Animal[];
}

const SecondSection: React.FC = () => {
  const [popularAnimals, setPopularAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    const fetchPopularAnimals = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/animals-with-categories`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_CRUDAPI_KEY}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch popular animals");
        }

        const data: ApiResponse = await response.json();
        const filteredAnimals = data.items.filter((animal) => animal.isPopular);

        setPopularAnimals(filteredAnimals);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPopularAnimals();
  }, []);

  return (
    <section className="section2">
      <h1 className="text-3xl font-semibold text-black leading-[54px] tracking-[0%] text-center">
        Popular Animals
      </h1>
      <p className="font-poppins font-normal text-[18px] leading-[32px] tracking-[0%] text-center text-black mb-16">
        Top Picks
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
          {popularAnimals.map((animal) => {
            const imageUrl = new URL(
              `../assets/${animal.image}`,
              import.meta.url
            ).href;

            return (
              <SwiperSlide key={animal._uuid}>
                <div className="w-[237px] h-[326px] rounded-lg overflow-hidden bg-[#FBFBFB] shadow-[0px_10px_20px_0px_#0000001A]">
                  <img
                    src={imageUrl}
                    alt={animal.name}
                    className="w-full h-48 object-cover rounded-bl-2xl rounded-br-2xl"
                  />
                  <div className="p-4">
                    <h1 className="font-poppins font-medium text-[16px] leading-[24px] tracking-[0%] text-center text-black mt-3">
                      {animal.name}: {animal.animal_description}
                    </h1>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default SecondSection;
