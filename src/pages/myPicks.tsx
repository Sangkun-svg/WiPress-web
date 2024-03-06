import { NavBar ,BottomNav,BasicPostItem} from "@/components";
import { authOptions } from "../pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth";
import { supabase } from "@/utils/database";

export const getServerSideProps = async (context:any) => {
  const req = context.req as any;
  const res = context.res as any;
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }
  const { data, error } = await supabase
    .from("Pick")
    .select("*, Post(id,title,content,image,picks)")
    .eq("user_id", (session as any).user.id);

  return {props : {
    myPick: data,
    user_id: (session as any).user.id
  }}
}

const MyPickPage = (props:any) => {
  return (
    <div className='max-w-[600px] flex justify-center items-center flex-col mx-auto my-0 px-4 py-0'>
      <NavBar title="나의 Pick 모아보기" backgroundColor={"#fff"}/>
      <div className='w-full flex flex-col mt-[26px] mb-4 mb-[60px] mx-0'>
        <div className='w-full flex justify-between items-baseline mb-3.5'>
          <p className='text-[19px] not-italic font-semibold leading-[100%]'>Pick 리스트</p>
        </div>
        <div className="flex flex-col gap-3.5">
          {props.myPick.map((el:any) => {
            return <BasicPostItem 
                    key={el.user_post_pick_id} 
                    id={el.post_id} 
                    user_id={props.user_id} 
                    title={el.Post.title} 
                    content={el.Post.content} 
                    images={el.Post.image} 
                    picks={el.Post.picks} 
                    Pick={[{user_id: el.user_id}]}
                  />
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default MyPickPage;
