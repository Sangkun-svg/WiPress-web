import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import styled from "styled-components";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props {
  images?: Array<string>;
}
const slideData = [
  {
    id: 1,
    path: "https://s3-alpha-sig.figma.com/img/e4af/d2ee/4a8b2919c54bc15e5731eb5475e1c8fc?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KrFRwhoxySxBcoNoTFoculsuXvHgYzKy9cXF~M4e96CUDFy1USYdtZPrhsTw1t4XQ9ejQxmNMHl2PN2BCAbp06F8mwu9LBN9PyPxS8kWPP6MbIo2bRq18DhZ3Rn6GG7Z41WSD0Btf8TQ2Q-jWdrCTbtWFnLFL04YqEEzJ5Lv4-rbLfm9LRAHCZbeFHT2k882n6b700P~Y7M3SzeF-EdykMdHLvH7o8tSqsvDydlt6eObvgm6oGRdOVbpafCOT43jHYooOynoKh3gvL2dCmzT78ggA00Q-F6NOsX5OGVgPR1HQbg5jOfV4nQ1DihDVH8dE2cYf20fcBuYng1im8t1zQ__",
  },
  {
    id: 2,
    path: "https://s3-alpha-sig.figma.com/img/e4af/d2ee/4a8b2919c54bc15e5731eb5475e1c8fc?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KrFRwhoxySxBcoNoTFoculsuXvHgYzKy9cXF~M4e96CUDFy1USYdtZPrhsTw1t4XQ9ejQxmNMHl2PN2BCAbp06F8mwu9LBN9PyPxS8kWPP6MbIo2bRq18DhZ3Rn6GG7Z41WSD0Btf8TQ2Q-jWdrCTbtWFnLFL04YqEEzJ5Lv4-rbLfm9LRAHCZbeFHT2k882n6b700P~Y7M3SzeF-EdykMdHLvH7o8tSqsvDydlt6eObvgm6oGRdOVbpafCOT43jHYooOynoKh3gvL2dCmzT78ggA00Q-F6NOsX5OGVgPR1HQbg5jOfV4nQ1DihDVH8dE2cYf20fcBuYng1im8t1zQ__",
  },
  {
    id: 3,
    path: "https://s3-alpha-sig.figma.com/img/e4af/d2ee/4a8b2919c54bc15e5731eb5475e1c8fc?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KrFRwhoxySxBcoNoTFoculsuXvHgYzKy9cXF~M4e96CUDFy1USYdtZPrhsTw1t4XQ9ejQxmNMHl2PN2BCAbp06F8mwu9LBN9PyPxS8kWPP6MbIo2bRq18DhZ3Rn6GG7Z41WSD0Btf8TQ2Q-jWdrCTbtWFnLFL04YqEEzJ5Lv4-rbLfm9LRAHCZbeFHT2k882n6b700P~Y7M3SzeF-EdykMdHLvH7o8tSqsvDydlt6eObvgm6oGRdOVbpafCOT43jHYooOynoKh3gvL2dCmzT78ggA00Q-F6NOsX5OGVgPR1HQbg5jOfV4nQ1DihDVH8dE2cYf20fcBuYng1im8t1zQ__",
  },
  {
    id: 4,
    path: "https://s3-alpha-sig.figma.com/img/e4af/d2ee/4a8b2919c54bc15e5731eb5475e1c8fc?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KrFRwhoxySxBcoNoTFoculsuXvHgYzKy9cXF~M4e96CUDFy1USYdtZPrhsTw1t4XQ9ejQxmNMHl2PN2BCAbp06F8mwu9LBN9PyPxS8kWPP6MbIo2bRq18DhZ3Rn6GG7Z41WSD0Btf8TQ2Q-jWdrCTbtWFnLFL04YqEEzJ5Lv4-rbLfm9LRAHCZbeFHT2k882n6b700P~Y7M3SzeF-EdykMdHLvH7o8tSqsvDydlt6eObvgm6oGRdOVbpafCOT43jHYooOynoKh3gvL2dCmzT78ggA00Q-F6NOsX5OGVgPR1HQbg5jOfV4nQ1DihDVH8dE2cYf20fcBuYng1im8t1zQ__",
  },
  {
    id: 5,
    path: "https://s3-alpha-sig.figma.com/img/e4af/d2ee/4a8b2919c54bc15e5731eb5475e1c8fc?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KrFRwhoxySxBcoNoTFoculsuXvHgYzKy9cXF~M4e96CUDFy1USYdtZPrhsTw1t4XQ9ejQxmNMHl2PN2BCAbp06F8mwu9LBN9PyPxS8kWPP6MbIo2bRq18DhZ3Rn6GG7Z41WSD0Btf8TQ2Q-jWdrCTbtWFnLFL04YqEEzJ5Lv4-rbLfm9LRAHCZbeFHT2k882n6b700P~Y7M3SzeF-EdykMdHLvH7o8tSqsvDydlt6eObvgm6oGRdOVbpafCOT43jHYooOynoKh3gvL2dCmzT78ggA00Q-F6NOsX5OGVgPR1HQbg5jOfV4nQ1DihDVH8dE2cYf20fcBuYng1im8t1zQ__",
  },
];

const ImageSwiper = ({ images }: Props) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const handleSlideChange = (currentIndex: number) => {
    setCurrentIdx(currentIndex);
  };

  return (
    <SwiperContainer>
      <Swiper
        onSlideChange={(swiper: any) => {
          handleSlideChange(swiper.activeIndex);
        }}
      >
        {/* TODO: change slideData -> images */}
        {slideData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Image
              alt="demoImage"
              src={slide.path}
              width={350}
              height={253}
              style={{ borderRadius: "6px" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <DotList>
        {/* TODO: change slideData -> images */}
        {slideData.map((_, idx) => {
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
