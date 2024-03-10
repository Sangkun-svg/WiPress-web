import { ChangeEvent,useState } from "react";
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
import { CommentList, MyPickItem } from "@/domain/Posts";
import { CustomImage, NavBar, ImageSwiper} from "@/components";



export const getServerSideProps = async (context:any) => { 
  const req = context.req as any;
  const res = context.res as any;
  const session = await getServerSession(req, res, authOptions)
  let myPick:any[] = [];
  let user_id = "";
  if(!!session){
    const { data: myPickData, error:myPickEror } = await supabase.from('Pick').select(`*, Post: post_id(id,title,content,image,picks)`).eq("user_id", (session?.user as any).id);
    myPick = myPickData as any[]
    user_id = (session?.user as any).id
  }
  const { data: Post, error:PostError } = await supabase.from('Post').select(`*, Pick ( * ), Like( * ), Comment(*, User: user_id(name,party,position))`).eq("id", context.query.id);
  const { data: PickRegistors, error:PickRegistorsError } = await supabase.from('Post').select(`*, Pick ( * , User( id,name,profile,party,position ) )`).eq("id", context.query.id);

  return { props: { post : Post![0], user_id: user_id, myPick: myPick , pickRegistors: PickRegistors![0].Pick} } 
}

const RegisterPostDetail = ({post, user_id, myPick, pickRegistors}: any) => {
  const router = useRouter()
  const params = useParams<{ id: string }>();
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

  const handleUploadComment = async () => {
    if(Boolean(user_id) === false) router.push("/signin");
    try {
      const { data:newComment, error:newCommentError } = await supabase.from('Comment').insert([{ user_id: user_id ,post_id: params.id,content: comment },]).select("*,User(name,party)");
      const { data, error:PostError } = await supabase.from('Post').insert([{ title: post.title, subtitle: "",content: "",user_id: user_id,type:"article",link: newComment![0].content },]);
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
    <div className="w-full max-w-[600px] mx-auto my-0">
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
      <NavBar title={"보도자료 게시글"} backgroundColor={"#fff"}/>
      <div className="w-full flex flex-col justify-center bg-[#fff] gap-[13px] pt-6 pb-7 px-4">
        <p className="text-[19px] not-italic font-semibold leading-[100%]">{post.title}</p>
        <p className="text-[#4a4a4a] text-[17px] not-italic font-medium leading-[100%]">{post.subtitle}</p>
        <p className="text-[15px] not-italic font-normal leading-[170%]">{post.content}</p>
        {post.image && <ImageSwiper images={post.image}/>}
      </div>
      <div className="bg-[#f7f7fa] pt-6 pb-7">
      <div className="flex items-center justify-between mb-[22px] mx-0 px-4 py-0">
        <div className="flex items-center gap-2">
          <IconButton onClick={handleClickLike}>
            {isLiked ? <FavoriteRoundedIcon style={{ color: "#0B834B"}}/> :  <FavoriteBorder />}
          </IconButton>
          <p className="text-[#303030] text-base not-italic font-normal leading-[100%] tracking-[0.16px]">{likeCount}</p>
          <IconButton onClick={handleClickShare} style={{ marginLeft: "24px" }} >
            <IosShareOutlinedIcon/>
          </IconButton>
        </div>
        <IconButton className="flex w-[130px] justify-center items-center gap-2 bg-white px-4 py-2 rounded-md" onClick={handleDownloadFile} disabled={!hasFile}>
          <FolderOutlinedIcon/>
            <p className="text-[#303030] text-sm not-italic font-normal leading-[100%] tracking-[0.14px] whitespace-nowrap m-0">{hasFile ? "파일 열기" : "파일이 없습니다"}</p>
          </IconButton>
        <input id="file" type="file" className="hidden" />
      </div>
        <CommentList commentList={commentList}
          comment={comment}
          isPickedStatus={isPickedStatus} 
          handleComment={handleComment}
          handleUploadComment={handleUploadComment}
        />
      </div>
      <div className="flex flex-col justify-center gap-3 px-4 py-0 pt-7">
        <p className="text-[15px] not-italic font-medium leading-[100%] mb-2.5">Pick한 기자</p>
        {pickRegistors.map((el: any) => {
          const isWritten = post.Comment.some((comment: { user_id: string }) => comment.user_id === el.User.id);
          return (
          <div key={el.user_post_pick_id} className="flex justify-between">
            <div className="flex">
              {el?.User?.profile ? 
                <CustomImage alt="user_profile" src={el.User.profile} width={84} height={84}/> :  
                <div className="demoImage" style={{ width: "84px", height: "84px", borderRadius: "6px", background: "#F2F2F7", }} />
              }
              <div className="flex flex-col justify-center gap-1.5 ml-3">
                <p className="text-sm not-italic font-normal leading-[100%]">{el.User.name}</p>
                <p className="text-[13px] not-italic font-normal leading-[100%] text-[#4A4A4A]">{el.User.position}</p>
                <p className="text-[13px] not-italic font-normal leading-[100%] text-[#4A4A4A]">{el.User.party}</p>
              </div>
            </div>
          <div className="h-5 bg-[#F7F7FA] gap-2.5 px-1 py-[3px] rounded-[3px]">
            <p className="text-[#0B834B] text-[13px] not-italic font-normal leading-[100%]">{isWritten ? "작성완료" : "미작성"}</p>
          </div>
          </div>  
          )
        })}
      </div>
      <div className="w-full flex flex-col justify-center gap-3 mx-0 my-7 px-4 py-0">
        <p className="text-[15px] not-italic font-medium leading-[100%] mb-2.5">나의 Pick 현황</p>
          {myPick.map((el:any) => {
              return <MyPickItem 
                key={el.user_post_pick_id} 
                picks={el.Post.picks}
                user_id={user_id}
                id={el.Post.id}
                title={el.Post.title}
                content={el.Post.content}
                images={el.Post.image}
              />
          })}
      </div>
    </div>
  );
};

export default RegisterPostDetail;
