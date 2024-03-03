import { ChangeEvent,useState } from "react";
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
import { useParams } from 'next/navigation'
import { CommentList, MyPickItem } from "@/domain/Posts";
import { CustomImage, NavBar, ImageSwiper} from "@/components";



export const getServerSideProps = async (context:any) => { 
  const req = context.req as any;
  const res = context.res as any;
  const session = await getServerSession(req, res, authOptions)

  const { data: Post, error:PostError } = await supabase.from('Post').select(`*, Pick ( * ), Like( * ), Comment(*, User: user_id(name,party,position))`).eq("id", context.query.id);
  const { data: myPick, error:myPickEror } = await supabase.from('Pick').select(`*, Post: post_id(id,title,content,image,picks)`).eq("user_id", (session?.user as any).id);
  const { data: PickRegistors, error:PickRegistorsError } = await supabase.from('Post').select(`*, Pick ( * , User( name,profile,party,position ) )`).eq("id", context.query.id);

  return { props: { post : Post![0], user_id: (session?.user as any).id, myPick: myPick , pickRegistors: PickRegistors![0].Pick} } 
}
const RegisterPostDetail = ({post, user_id, myPick, pickRegistors}: any) => {
  const params = useParams<{ id: string }>();
  const BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL!;
  const isLike = post.Like.some((el: { user_id: string }) => el.user_id === user_id);
  const isPicked = post.Pick.some((el: { user_id: string }) => el.user_id === user_id);
  const [isAlertShown, setIsAlertShown] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [commentList, setCommentList] = useState<Array<any>>(post.Comment);
  const [isLiked, setIsLiked] = useState<boolean>(isLike);
  const [isPickedStatus] = useState<boolean>(isPicked)
  const [hasFile] = useState<boolean>(Boolean(post.file));
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
    try {
      const { data:newComment, error:newCommentError } = await supabase.from('Comment').insert([{ user_id: user_id ,post_id: params.id,content: comment },]).select("*,User(name,party)");
      const { data:Post, error:PostError } = await supabase.from('Post').insert([{ title: post.title, subtitle: "",content: "",user_id: user_id,type:"article",link: newComment![0].content },]);
      if(newCommentError) throw new Error(newCommentError.message) 
      if(PostError) throw new Error(PostError.message) 
      setCommentList(prev => [...prev, newComment![0]])
      setComment("")
    } catch (error) {
      console.error('댓글 작성 중 오류가 발생했습니다:', error);
    }
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
      // TODO: try add BASE_URL
      .download(`/file/${post.id}/${post.file[0]}`);
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
      <NavBar title={"보도자료 게시글"} />
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
        <CommentList commentList={commentList}
          comment={comment}
          isPickedStatus={isPickedStatus} 
          handleComment={handleComment}
          handleUploadComment={handleUploadComment}
          />
      <ReporterContainer>
        {/* TODO<Client>: Image size 84px 로 맞추기 */}
        <CommentCount>Pick한 기자</CommentCount>
        {pickRegistors.map((el: any) => {
          return <ReporterItem key={el.user_post_pick_id}>
            {el.User.profile ? 
              <CustomImage alt="user_profile" src={el.User.profile} width={84} height={84}/> :  
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
const CommentCount = styled.p`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 15px */
  margin-bottom: 10px;
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
