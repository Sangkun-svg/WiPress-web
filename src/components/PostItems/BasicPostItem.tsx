import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import { useRouter } from "next/router";
import { supabase } from '@/utils/database';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";
import CustomImage from "../CustomImage";

interface Props {
  id?:string;
  title?: string;
  content?: string;
  images?: Array<string>;
  user_id: string;
  picks: number;
  Pick: Array<{user_id : string}>;
}

const BasicPostItem = ({ user_id,id,title, content, images, picks, Pick }: Props) => {
  const router = useRouter();
  const isPicked = Pick.length === 0 ? false : Pick.some((el: { user_id: string }) => el.user_id === user_id);
  const [isPickedStatus, setIsPickedStatus] = useState<boolean>(isPicked)
   
  const handleDetailPage = () => router.push(`/registerPost/${id}`);
  const handleClickPick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if(Boolean(user_id) === false) { router.push("/signin") }
    else{
      setIsPickedStatus(prevState => !prevState);
      try {
        if(isPickedStatus){
          await Promise.all([
            supabase.from('Pick').delete().eq('user_id', user_id).eq('post_id', id),
            supabase.from('Post').update({ picks: picks - 1 }).eq('id', id)
          ]);
        }else {
          await Promise.all([
            supabase.from('Pick').insert([{ user_id: user_id, post_id: id }]),
            supabase.from('Post').update({ picks: picks + 1 }).eq('id', id)
          ]);
        }
      } catch (error) {
        console.error('Pick 처리 중 오류가 발생했습니다:', error);
      }
    }
  }
  
  return (
    <div className="cursor-pointer flex justify-between items-center bg-[#f7f7fa] rounded-md" 
      style={{ padding: images  ? "8px" : "20px 8px 18px 20px"}}
      onClick={handleDetailPage} 
    >
      <div className="flex gap-[10]">
        {images &&  
          <CustomImage
            alt="thumbnail"
            src={images[0]}
            width={120}
            height={90}
          />
        }
        <div className="flex flex-col justify-center gap-2.5">
          <p className="text-[15px] not-italic font-medium leading-[100%] overflow-hidden text-ellipsis" style={{display: "-webkit-box", WebkitLineClamp: 1,lineClamp: 1, WebkitBoxOrient: "vertical"}}>
            {title}
          </p>
          <p className="text-[#222] text-[13px] not-italic font-normal leading-[150%] overflow-hidden text-ellipsis" style={{display: "-webkit-box", WebkitLineClamp: 2,lineClamp: 2, WebkitBoxOrient: "vertical"}}>
            {content}
          </p>
        </div>
      </div>
      <IconButton onClick={handleClickPick} sx={{width: "40px", height: "44.5px"}}>
        <TouchAppOutlinedIcon style={{ color : isPicked ? "#0B834B" : "#D4D4D4" }}/>
      </IconButton>
    </div>
  );
};

export default BasicPostItem;
