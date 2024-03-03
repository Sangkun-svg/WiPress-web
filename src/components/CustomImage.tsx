import Image, { ImageProps } from 'next/image'

type ImageWithStateProps = ImageProps

const CustomImage = (props: ImageWithStateProps) => {
    const BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL!
    return <Image {...props} src={BASE_URL + props.src}/>
};

export default CustomImage;
