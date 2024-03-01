import Image from "next/image";
import styled from "styled-components";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import { useRouter } from "next/router";
import { usePathname } from 'next/navigation';
import { supabase } from '@/utils/database';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";

interface Props {
  id?:string;
  title?: string;
  content?: string;
  images?: Array<string>;
  user_id: string;
  Pick: Array<{user_id : string}>;
}

const BasicPostItem = ({ user_id,id,title, content, images, Pick }: Props) => {
  const isPicked = Pick.some((el: { user_id: string }) => el.user_id === user_id);
  const [isPickedStatus, setIsPickedStatus] = useState<boolean>(isPicked)
  const router = useRouter();
  const pathname = usePathname();
  // TODO: delete baseUrl and use env 
  const BASE_URL = "https://jjgkztugfylksrcdbaaq.supabase.co/storage/v1/object/public/"
   
  const handleDetailPage = () => router.push(`/${pathname}/${id}`);
  const handleClickPick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isPickedStatus) {
      // 이미 Pick된 경우, Pick을 취소합니다.
      const { error } = await supabase
        .from('Pick')
        .delete()
        .eq('user_id', user_id)
        .eq('post_id', id);
      if (!error) {
        setIsPickedStatus(false);
      }
    } else {
      // Pick을 추가합니다.
      const { data, error } = await supabase
        .from('Pick')
        .insert([{ user_id: user_id, post_id: id }]);
      if (!error && data) {
        setIsPickedStatus(true);
      }
    }
  }
  
  return (
    <Container onClick={handleDetailPage} padding={images ? "8px" : "20px 18px"}>
      <div style={{display : "flex" , gap: 10}}>
      {images &&
        <Image
          alt="thumbnail"
          src={BASE_URL + images[0]}
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
      <IconButton onClick={handleClickPick}>
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
