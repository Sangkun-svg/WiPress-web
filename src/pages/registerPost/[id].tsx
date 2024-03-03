import { ChangeEvent,useState } from "react";
import styled from "styled-components";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import NavBar from "@/components/NavBar";
import ImageSwiper from "@/components/ImageSwiper";
import CheckIcon from '@mui/icons-material/Check';
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth";
import { supabase } from "@/utils/database";
import { IconButton , Alert, Fade} from '@mui/material';
import { useParams } from 'next/navigation'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { MyPickItem } from "@/domain/Posts";
import Image from "next/image";

dayjs.extend(relativeTime);
dayjs.locale('ko');


export const getServerSideProps = async (context:any) => { 
  const req = context.req as any;
  const res = context.res as any;
  const session = await getServerSession(req, res, authOptions)

  const { data: Post, error:PostError } = await supabase
  .from('Post')
  .select(`*, Pick ( * ), Like( * ), Comment(*, User: user_id(name,party,position))`)
  .eq("id", context.query.id);

  const { data: myPick, error:myPickEror } = await supabase
  .from('Pick')
  .select(`*, Post: post_id(id,title,content,image,picks)`)
  .eq("user_id", (session?.user as any).id);

  const { data: PickRegistors, error:PickRegistorsError } = await supabase
  .from('Post')
  .select(`*, Pick ( * , User( name,profile,party,position ) )`)
  .eq("id", context.query.id);

  return { props: { post : Post![0], user_id: (session?.user as any).id, myPick: myPick , pickRegistors: PickRegistors![0].Pick} } 
}
const RegisterPostDetail = ({post, user_id, myPick, pickRegistors}: any) => {
  // TODO: delete baseUrl and use env 
  const BASE_URL = "https://jjgkztugfylksrcdbaaq.supabase.co/storage/v1/object/public/"
  const isLike = post.Like.some((el: { user_id: string }) => el.user_id === user_id);
  const isPicked = post.Pick.some((el: { user_id: string }) => el.user_id === user_id);
  const params = useParams<{ id: string }>();
  const [isAlertShown, setIsAlertShown] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [commentList, setCommentList] = useState<Array<any>>(post.Comment);
  const [isLiked, setIsLiked] = useState<boolean>(isLike);
  const [isPickedStatus, setIsPickedStatus] = useState<boolean>(isPicked)
  const [hasFile] = useState<boolean>(Boolean(post.file));
  // TODO: post.Like.length -> post.likes
  const [likeCount, setLikeCount] = useState<number>(post.likes);
  const handleClickShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
    }
    setIsAlertShown(true)
  }
  const handleClickLike = async () => {
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

  const handleUploadComment = async () => {
    const { data, error } = await supabase
    .from('Comment')
    .insert([
      { user_id: user_id,post_id: params.id,content: comment },
    ])
    .select();
    if(error) console.error("COMMENT UPLOAD ERROR : ", error);
    console.log(data);
  }
  const handleComment = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setComment(event.target.value);
  };
  // TODO<SERVER>: implement download file  
  const handleDownloadFile = async () => {
    if(post.file.length === 1){
      const { data, error } = await supabase
      .storage
      .from('POST')
      .download(`file/${post.id}/${post.file[0]}`);
      if(error) console.error("FILE DOWNLOAD ERROR : ", error)
      console.log(data)
    }
    if(post.file.length > 1){
      const result = await Promise.all(
        Object.values(post.file).map((eachfile:any) => {
          const filePath = eachfile.split("/").at(-1);
          return supabase.storage.from('POST').download(`file/${post.id}/${filePath}`);
        }),
      );
      console.log({result})
      // return result.map((el) => (el.data as any).fullPath);
    }
  }
  const calculateTimeAgo = (createdAt: string) => {
    const now = dayjs();
    const timeAgo = dayjs(createdAt);
    return timeAgo.from(now);
  }

  return (
    <Container>
      {/* TODO:Should be change to antd message */}
      {/* WARNING: error occur when using antd in this repo */}
      {isAlertShown && 
        <Fade 
          in={isAlertShown}
          timeout={{ enter: 1000, exit: 1000 }} 
          addEndListener={() => {
            setTimeout(() => {
              setIsAlertShown(false);
            }, 3000);
          }}>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            URL이 복사되었습니다.
          </Alert>
        </Fade>
      }
      <NavBar title={"보도자료 게시글"} />
      <ContentContainer>
        <Title>{post.title}</Title>
        <SubTitle>{post.subtitle}</SubTitle>
        <Description>{post.content}</Description>
        {post.image && <ImageSwiper images={post.image}/>}
      </ContentContainer>
      <ActionContainer>
        {/* 좋아요 컨테이너 */}
        <LikeContainer>
          <IconButton onClick={handleClickLike}>
            {isLiked ? <FavoriteRoundedIcon/> :  <FavoriteBorder />}
          </IconButton>
          <FavoriteText>{likeCount}</FavoriteText>
          {/* 공유 버튼 */}
          <IconButton onClick={handleClickShare} style={{ marginLeft: "24px" }} >
            <IosShareOutlinedIcon/>
          </IconButton>
        </LikeContainer>
        {/* 파일 다운 버튼 */}
        <FileButton onClick={handleDownloadFile} disabled={!hasFile}>
          <FolderOutlinedIcon/>
          <p>{hasFile ? "파일 열기" : "파일이 없습니다"}</p>
        </FileButton>
        <input id="file" type="file" className="hidden" />
      </ActionContainer>
      {/* 댓글 컨테이너 */}
      <CommentContainer>
        <CommentCount>댓글 {commentList.length}</CommentCount>
        <CommentInput
          value={comment}
          onChange={handleComment}
          placeholder="ex. Pick한 기자만 댓글을 달 수 있습니다"
          disabled={!Boolean(isPickedStatus)}
        />
        <button type="button" style={{float: "inline-end", marginTop: "14px"}} onClick={handleUploadComment}>
          댓글달기
        </button>
      </CommentContainer>
      <CommentList>
        {commentList.map((el:any) => {
          return (
            <CommentItem key={el.id}>
              <p>기자{el.User.name} · {el.User.party}소속</p>
              <p>{el.content}</p>
              <p>{calculateTimeAgo(el.created_at)}</p>
            </CommentItem>
          )})}
      </CommentList>
      {/*  */}
      <ReporterContainer>
        {/* TODO<Client>: should be abstrative */}
        {/* TODO<Client>: Image size 84px 로 맞추기 */}
        <CommentCount>Pick한 기자</CommentCount>
        {pickRegistors.map((el: any) => {
          console.log({user: el.User})
          return <ReporterItem key={el.user_post_pick_id}>
            {el.User.profile ? 
              <Image alt="user_profile" src={BASE_URL + el.User.profile} width={84} height={84}/> :  
              <div className="demoImage" style={{ width: "84px", height: "84px", borderRadius: "6px", background: "#F2F2F7", }} />
            }
            <ReporterTypoWrapper>
              <ReporterTypo color="#000" fontSize="14px">
                {el.User.name}
              </ReporterTypo>
              <ReporterTypo color="#4A4A4A" fontSize="13px">
                {el.User.position}
              </ReporterTypo>
              <ReporterTypo color="#4A4A4A" fontSize="13px">
                {el.User.party}
              </ReporterTypo>
            </ReporterTypoWrapper>
          </ReporterItem>
        })}
      </ReporterContainer>
      <MyPickContainer>
        {/* TODO<Client>: 작성완료/미완료 Chip 만들기 */}
        <CommentCount>나의 Pick 현황</CommentCount>
          {myPick.map((el:any) => {
              return <MyPickItem key={el.user_post_pick_id} 
                picks={el.Post.picks}
                user_id={user_id}
                id={el.Post.id}
                title={el.Post.title}
                content={el.Post.content}
                images={el.Post.image}
              />;
          })}
      </MyPickContainer>
    </Container>
  );
};

export default RegisterPostDetail;

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
const CommentContainer = styled.div`
  padding: 0 16px;
`;
const CommentCount = styled.p`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 15px */
  margin-bottom: 10px;
`;
const CommentInput = styled.input`
  width: 100%;
  max-height: 50px;
  border-radius: 6px;
  padding: 18px 16px;
  background-color: #f7f7fa;
`;
const CommentList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 34px;
  padding: 0 16px;
  margin: 18px 0 28px;
`;
const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  p {
    color: #636366;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
  }
`;

const ReporterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  padding: 0 16px;
`;

const ReporterItem = styled.div`
  display: flex;
`;

const ReporterTypoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  margin-left: 12px;
`;

const ReporterTypo = styled.p<{ color: string; fontSize: string }>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

const MyPickContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  padding: 0 16px;
  margin: 28px 0;
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
