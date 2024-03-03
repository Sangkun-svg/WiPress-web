import styled from "styled-components";
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
  const isPicked = Pick.some((el: { user_id: string }) => el.user_id === user_id);
  const [isPickedStatus, setIsPickedStatus] = useState<boolean>(isPicked)
  const router = useRouter();
   
  const handleDetailPage = () => router.push(`/registerPost/${id}`);
  const handleClickPick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
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
  
  return (
    <Container onClick={handleDetailPage} padding={images ? "8px" : "20px 8px 18px 20px"}>
      <div style={{display : "flex" , gap: 10}}>
        {/* TODO: All Image component set fix sizes */}
        {images &&
          <CustomImage
            alt="thumbnail"
            src={images[0]}
            width={120}
            height={90}
            style={{ borderRadius: "6px" }}
          />
        }
        <ColDiv>
          <PostTitle>{title}</PostTitle>
          <PostDescription>{content}</PostDescription>
        </ColDiv>
      </div>
      <IconButton onClick={handleClickPick} sx={{width: "40px", height: "44.5px"}}>
        <TouchAppOutlinedIcon color={isPickedStatus ? "inherit" : "disabled"}/>
      </IconButton>
    </Container>
  );
};

export default BasicPostItem;

const Container = styled.div<{padding: string}>`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.padding};
  border-radius: 6px;
  background: #f7f7fa;
`;

const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const PostTitle = styled.p`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;
const PostDescription = styled.p`
  color: #222;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;
