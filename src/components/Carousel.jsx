import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { c1, c2, c3 } from "../constants/assets";

const images = [c1, c2, c3];

const Carousel = () => {
  return (
    <div className="w-full h-full p-6">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
