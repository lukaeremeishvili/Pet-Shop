// import Dog from "./HomeImages/Rectangle 2286.svg";
// import "../App.css"
// import Dog1 from "./HomeImages/dog-boxs.jpg";
// import Dog2 from "./HomeImages/dog-boxs2.png";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";


// interface Describe {
//   id: number
//   img: string
//   title: string
//   description:string
// }

// const dogData:Describe[] = [
//   {
//     id: 1,
//     img: Dog,
//     title: "Puppy",
//     description:
//       "Dog: Loyal, friendly, and playful, dogs are known for being affectionate companions to humans and are often referred to as 'man's best friend.'",
//   },
//   {
//     id: 2,
//     img: Dog1,
//     title: "Boxer",
//     description:
//       "The Boxer is a medium-to-large, muscular, and athletic breed known for its loyalty, intelligence, and playful nature. With a short, smooth coat that comes in fawn or brindle, often with white markings, Boxers have a distinctive, square-shaped head and expressive, dark eyes.",
//   },
//   {
//     id: 3,
//     img: Dog2,
//     title: "Street Dog",
//     description:
//       "Street dogs, also known as stray dogs or feral dogs, are free-ranging canines that live in urban or rural areas without a permanent home. They come in various sizes, colors, and breeds, often adapting to their environment for survival.",
//   },
// ];
  const HomePage=() =>{
    return (
<>
    <FirstSection/>
   <SecondSection/>
    

    </>
    //   <>
    //     <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
    //   {dogData.map((dog) => (
    //     <SwiperSlide key={dog.id}>
    //       <section className="bg-[#FFF0D9] py-4 h-[660px] w-full mb-16 ">
    //         <div className="container flex items-center max-w-[1190px] mx-auto flex-row justify-between">
    //           <div className="dogImage">
    //             <img src={dog.img} alt={dog.title}  />
    //           </div>
    //           <div className="info pt-[35px]">
    //             <h2 className="title mb-[32px] font-poppins font-bold text-[36px] leading-[54px] tracking-[0%]">
    //               {dog.title}
    //             </h2>
    //             <p className="description mb-[32px] font-poppins font-normal text-[18px] leading-[32px] tracking-[0%] max-w-xs">
    //               {dog.description}
    //             </p>
    //             <a
    //               href="#"
    //               className="py-[9px] px-[24px] bg-[#E58608] font-montserrat font-medium text-[18.66px] leading-[32px] tracking-[0%] text-[#FFFF] rounded-[20px]"
    //             >
    //               Buy me
    //             </a>
    //           </div>
    //         </div>
    //       </section>
    //     </SwiperSlide>
    //   ))}
    // </Swiper>

    // </>
    );
  }
  
  export default HomePage;