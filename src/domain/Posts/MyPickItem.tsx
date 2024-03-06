import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from '@/utils/database';
import { CustomImage } from "@/components";
import IconButton from '@mui/material/IconButton';
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";

interface Props {
  id?:string;
  title?: string;
  content?: string;
  images?: Array<string>;
  picks:number;
  user_id: string;
}

const MyPickItem = ({ user_id,id,title, content,picks, images }: Props) => {
    const [isPickedStatus, setIsPickedStatus] = useState<boolean>(true)
    const router = useRouter();
    const handleDetailPage = () => router.push(`/registerPost/${id}`);
    const handleClickPick = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setIsPickedStatus(prevState => !prevState);
      try {
        if(isPickedStatus){
          await Promise.all([
            supabase.from('Pick').delete().eq('user_id', user_id).eq('post_id', id),
            supabase.from('Post').update({ picks: picks - 1 === 0 ? 0 : picks - 1 }).eq('id', id)
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
  
    return (
        <div className="cursor-pointer flex justify-between bg-[#f7f7fa] rounded-md" onClick={handleDetailPage} style={{ padding: images  ? "8px" : "20px 8px 18px 20px"}}>
          <div className="flex gap-2.5">
          {images &&
            <CustomImage
              alt="thumbnail"
              src={images[0]}
              width={120}
              height={90}
              style={{ borderRadius: "6px" }}
            />
          }
          <div className="flex flex-col justify-center gap-2.5">
            <p className="text-[15px] not-italic font-medium leading-[100%]">{title}</p>
            <p 
              className="text-[#222] text-[13px] not-italic font-normal leading-[150%] overflow-hidden text-ellipsis"
              style={{display: "-webkit-box", WebkitLineClamp: 2,lineClamp: 2, WebkitBoxOrient: "vertical"}}
            >
              {content}
            </p>
          </div>
          </div>
          <IconButton onClick={handleClickPick}>
            <TouchAppOutlinedIcon style={{ color : isPickedStatus ? "#0B834B" : "#D4D4D4"}}/>
          </IconButton>
        </div>
      );
    };
    
    export default MyPickItem;