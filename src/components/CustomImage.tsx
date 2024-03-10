import Image, { ImageProps } from 'next/image';

type CustomImageProps = ImageProps & {
  width: number;
  height: number;
};

const CustomImage = ({ width, height, ...props }: CustomImageProps) => {
  const BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL!;
  const imageUrl = BASE_URL + props.src + `?width=${width}&height=${height}`;
  return (
      <Image {...props} src={imageUrl} width={width} height={height}
          style={{objectFit: "contain" , width: `${width}px`, height: `${height}px`, borderRadius: "6px"}}
      />
    );
};

export default CustomImage;
