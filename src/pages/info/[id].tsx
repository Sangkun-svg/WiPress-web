import { useState } from "react";
import styled from "styled-components";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import CheckIcon from '@mui/icons-material/Check';
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth";
import { supabase } from "@/utils/database";
import { IconButton , Alert, Fade} from '@mui/material';
import { useParams, useRouter } from 'next/navigation'
import { NavBar, ImageSwiper} from "@/components";



export const getServerSideProps = async (context:any) => { 
  const req = context.req as any;
  const res = context.res as any;
  const session = await getServerSession(req, res, authOptions)
  const { data: Post, error:PostError } = await supabase.from('Post').select(`*, Pick ( * ), Like( * ), Comment(*, User: user_id(name,party,position))`).eq("id", context.query.id);

  return { props: { post : Post![0], user_id: (session?.user as any).id} } 
}
const InfoPostDetail = ({post, user_id}: any) => {
  const router = useRouter()
  const params = useParams<{ id: string }>();
  const BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL!;
  const isLike = post.Like.some((el: { user_id: string }) => el.user_id === user_id);
  const [isAlertShown, setIsAlertShown] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(isLike);
  const [hasFile] = useState<boolean>(Boolean(post.file));
  const [likeCount, setLikeCount] = useState<number>(post.likes);

  const handleClickShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
    }
    setIsAlertShown(true)
  }
  const handleClickLike = async () => {
    if(Boolean(user_id) === false) router.push("/signin");
    else {
      setIsLiked(prevState => !prevState);
      const updatedLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
      try {
        if(isLiked){
          await Promise.all([
            supabase.from('Like').delete().eq('user_id', user_id).eq('post_id', params.id),
            supabase.from('Post').update({ likes: updatedLikeCount }).eq('id', params.id)
          ]);
        }else {
          await Promise.all([
            supabase.from('Like').upsert({ user_id: user_id, post_id: params.id }),
            supabase.from('Post').update({ likes: updatedLikeCount }).eq('id', params.id)
          ]);
        }
        setLikeCount(updatedLikeCount);
      } catch (error) {
        console.error('좋아요 처리 중 오류가 발생했습니다:', error);
      }
    }
  }

  const handleDownloadFile = async () => {
    const hiddenLink = document.createElement('a');
    hiddenLink.style.visibility = 'hidden';
    document.body.appendChild(hiddenLink);

  if (!user_id) {
    router.push("/signin");
  } else {
    if (post.file.length === 1) {
      const filePath = post.file[0].split("/").at(-1);
      const { data } = await supabase
        .storage
        .from('POST')
        .getPublicUrl(`file/${post.id}/${filePath}`);
      if (data) {
        try {
          const response = await fetch(data.publicUrl);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);

          hiddenLink.href = url;
          hiddenLink.download = String(post.title).replaceAll(" ","_");
          hiddenLink.click();
        } catch (error) {
          console.error('Error downloading file:', error);
        }
      }
    }
    if (post.file.length > 1) {
      await Promise.all(
        post.file.map(async (eachfile:any) => {
          const filePath = eachfile.split("/").at(-1);
          const { data } = await supabase.storage.from('POST').getPublicUrl(`file/${post.id}/${filePath}`);
          if (data) {
            try {
              const response = await fetch(data.publicUrl);
              const blob = await response.blob();
              const url = window.URL.createObjectURL(blob);
              hiddenLink.href = url;
              hiddenLink.download = String(post.title).replaceAll(" ","_");
              hiddenLink.click();
            } catch (error) {
              console.error('Error downloading file:', error);
            }
          }
        })
      );
    }
  }
}


  return (
    <Container>
      {isAlertShown && 
        <Fade 
          in={isAlertShown}
          timeout={{ enter: 1000, exit: 1000 }}
          style={{ position: "fixed", zIndex: 999, top: "15%", left: "50%",transform: "translate(-50%, -50%)"}}
          addEndListener={() => {
            setTimeout(() => {
              setIsAlertShown(false);
            }, 3000);
          }}>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" style={{whiteSpace:"nowrap"}}>
            URL이 복사되었습니다.
          </Alert>
        </Fade>
      }
      <NavBar title={"여론분석 게시글"} />
      <ContentContainer>
        <Title>{post.title}</Title>
        <SubTitle>{post.subtitle}</SubTitle>
        <Description>{post.content}</Description>
        {post.image && <ImageSwiper images={post.image}/>}
      </ContentContainer>
      <ActionContainer>
        <LikeContainer>
          <IconButton onClick={handleClickLike}>
            {isLiked ? <FavoriteRoundedIcon/> :  <FavoriteBorder />}
          </IconButton>
          <FavoriteText>{likeCount}</FavoriteText>
          <IconButton onClick={handleClickShare} style={{ marginLeft: "24px" }} >
            <IosShareOutlinedIcon/>
          </IconButton>
        </LikeContainer>
        <FileButton onClick={handleDownloadFile} disabled={!hasFile}>
          <FolderOutlinedIcon/>
          <p>{hasFile ? "파일 열기" : "파일이 없습니다"}</p>
        </FileButton>
        <input id="file" type="file" className="hidden" />
      </ActionContainer>
    </Container>
  );
};

export default InfoPostDetail;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px 16px 28px;
  background: #f7f7fa;
  gap: 13px;
`;
const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  margin: 18px 0 22px;
`;
const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FileButton = styled(IconButton)`
  display: flex;
  width: 129px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  background: #f7f7fa;
  p {
    color: #303030;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    letter-spacing: 0.14px;
    margin: 0;
    white-space: nowrap;
  }
`;

const FavoriteText = styled.p`
  color: #303030;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: 0.16px;
`;
const Title = styled.p`
  color: #000;
  font-size: 19px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
`;
const SubTitle = styled.p`
  color: #4a4a4a;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;

const Description = styled.text`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
`;
