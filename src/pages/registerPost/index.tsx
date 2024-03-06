import SearchIcon from "@mui/icons-material/Search";
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth";
import { supabase } from "@/utils/database";
import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
import { Layout, BasicPostItem } from "@/components";

export const getServerSideProps = async (context:any) => { 
  const req = context.req as any;
  const res = context.res as any;
  const session = await getServerSession(req, res, authOptions)
  const user_id = !!session ? (session?.user as any).id : null
  const { data: AcceptedPost, error } = await supabase
  .from('AcceptedPost')
  .select(`*, Post (* , Pick( * ) )`)
  .eq('isAccepted', true)
  .eq('Post.type', 'registerPost')
  .order('created_at', { ascending: false });

  return { props: { post : AcceptedPost, user_id : user_id} } 
}

const RegisterPost = ({post, user_id} : any) => {
  const router = useRouter();
  const handleSearch = () => router.push("/search")
  return (
    <Layout>
      <div className="w-full flex flex-col mt-[26px] mb-4 mx-0">
        <div className="w-full flex justify-between items-baseline mb-3.5">
          <p className="text-[19px] not-italic font-semibold leading-[100%]">보도요청 게시판</p>
          <IconButton onClick={handleSearch} style={{ color: '#0B834B' }} >
            <SearchIcon />
          </IconButton>
        </div>
        <div className="flex flex-col gap-3.5">
          {post?.filter((el:any) =>el.Post).map((el:any) => {
              return <BasicPostItem key={el.Post.id} user_id={user_id} id={el.Post.id} title={el.Post.title} picks={el.Post.picks} content={el.Post.content} images={el.Post.image} Pick={el.Post.Pick} />
          })}
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPost;
