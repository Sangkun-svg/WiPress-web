import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import styled from "styled-components";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props {
  images: Array<string>;
}

const ImageSwiper = ({ images }: Props) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  // TODO: delete baseUrl and use env 
  const BASE_URL = "https://jjgkztugfylksrcdbaaq.supabase.co/storage/v1/object/public/"
  const handleSlideChange = (currentIndex: number) => {
    setCurrentIdx(currentIndex);
  };
  // TODO: 이미지 사이즈 fix
  return (
    <SwiperContainer>
      <Swiper
        onSlideChange={(swiper: any) => {
          handleSlideChange(swiper.activeIndex);
        }}
      >
        {images.map((imagePath,idx) => (
          <SwiperSlide key={idx}>
            <Image
              alt="demoImage"
              src={BASE_URL + imagePath}
              width={350}
              height={253}
              priority={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <DotList>
        {images.map((_, idx) => {
          const isCurrent = idx === currentIdx;
          return (
            <FiberManualRecordIcon
              key={idx}
              style={{ fontSize: "5px", color: isCurrent ? "#000" : "#D4D4D4" }}
            />
          );
        })}
      </DotList>
    </SwiperContainer>
  );
};

export default ImageSwiper;

const SwiperContainer = styled.div`
  max-width: 350px;
  max-height: 253px;
  margin: 4px auto 0 auto;
  border-radius: 6px;
`;

const DotList = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;
