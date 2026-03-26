"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import useGlobalContext from "@/hooks/useContext";

const fallbackImages = [
  "/assets/img/property/property-details/property-thumb-1.jpg",
  "/assets/img/property/property-details/property-thumb-2.jpg",
  "/assets/img/property/property-details/property-thumb-3.jpg",
];

interface Props {
  images?: string[];
}

export default function PropertyDetailsSlider({ images }: Props) {
  const { handleMouseEnter, handleMouseLeave } = useGlobalContext();

  const hasRealImages = images && images.length > 0;

  return (
    <div
      className="tp-property-details-slider tp-cursor-point-area"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tp-property-details-one swiper">
        <div className="swiper-wrapper">
          <Swiper
            spaceBetween={30}
            loop={true}
            breakpoints={{
              1400: { slidesPerView: 3 },
              1200: { slidesPerView: 3 },
              768:  { slidesPerView: 2 },
              576:  { slidesPerView: 1 },
              0:    { slidesPerView: 1 },
            }}
          >
            {(hasRealImages ? images : fallbackImages).map((url, i) => (
                <SwiperSlide key={i}>
                  <div className="tp-property-details-slider-thumb">
                    <img
                      src={url}
                      alt={`property-image-${i + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
