import styled from "styled-components";
import Image, { ImageProps } from 'next/image';

type CustomImageProps = ImageProps & {
  width: number;
  height: number;
};

const CustomImage = ({ width, height, ...props }: CustomImageProps) => {
  const BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL!;
  const imageUrl = BASE_URL + props.src + `?width=${width}&height=${height}`;
  return (
      <div style={{ width:"100%", height:"100%" ,maxWidth: width, maxHeight :height , overflow:"hidden" ,objectFit: "contain"}}>
        <Image {...props} src={imageUrl} width={width} height={height} style={{objectFit: "contain"}} />
    </div>
    );
};

export default CustomImage;
