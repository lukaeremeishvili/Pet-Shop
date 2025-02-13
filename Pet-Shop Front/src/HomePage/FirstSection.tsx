import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "./home.css";

interface Animal {
  _uuid: string;
  name: string;
  image: string;
  animal_description: string;
  price: number;
  title: string;
}

const FirstSection: React.FC = () => {
  const [dogData, setDogData] = useState<Animal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/animals-with-categories`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_CRUDAPI_KEY}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const animals: Animal[] = data.items || [];

        const sortedAnimals = animals
          .sort((a, b) => b.price - a.price) 
          .slice(0, 3); 
          
        setDogData(sortedAnimals);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching dog data:", error);
        setError("There was an error fetching the data.");
        setLoading(false); 
      }
    };

    fetchDogData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Swiper
      navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
      modules={[Navigation]}
      className="mySwiper"
      loop={true}
    >
      {dogData.map((dog) => (
        <SwiperSlide key={dog._uuid}>
          <section className="bg-[#FFF0D9] py-4 h-[660px] w-full mb-16">
            <div className="container flex items-center max-w-[1190px] mx-auto flex-row justify-between">
              <div className="dogImage relative">
                <img
                  src={`${
                    new URL(`../assets/${dog.image}`, import.meta.url).href
                  }`}
                  alt={dog.name}
                  className="w-[350px] h-[350px] rounded-full" 
                />

                <div className="flex justify-center mt-12 space-x-4">
                  <div className="custom-prev cursor-pointer text-[#E58608] text-3xl">
                    ←
                  </div>
                  <p className="description mb-[32px] font-poppins font-normal text-[18px] leading-[32px] max-w-xs">
                    {dog.name}
                  </p>
                  <div className="custom-next cursor-pointer text-[#E58608] text-3xl">
                    →
                  </div>
                </div>
              </div>

              <div className="info pt-[35px]">
                <h2 className="title mb-[32px] font-poppins font-bold text-[36px] leading-[54px]">
                  {dog.name}
                </h2>
                <p className="description mb-[32px] font-poppins font-normal text-[18px] leading-[32px] max-w-xs">
                  {dog.animal_description}
                </p>
                <Link
                  to={`/details/${dog._uuid}`}
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
  );
};

export default FirstSection;
