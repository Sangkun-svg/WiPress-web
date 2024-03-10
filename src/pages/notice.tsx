import { Layout, BasicPostItem } from "@/components";
import SearchIcon from "@mui/icons-material/Search";
import { getServerSession } from "next-auth";
import { supabase } from "@/utils/database";
import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
import { authOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps = async (context:any) => { 
  const req = context.req as any;
  const res = context.res as any;
  const session = await getServerSession(req, res, authOptions)
  const user_id = !!session ? (session?.user as any).id : null

  const { data, error } = await supabase
  .from("Post")
  .select("*, Pick (*)")
  .eq("type", "notice")
  .order("created_at", {ascending: false});
  
  if(error) throw new Error(error.message);
  
  return {
    props: {
      data: data,
      user_id : user_id
    }
  }
}

const NoticePage = (props:any) => {
  const router = useRouter();
  const handleSearch = () => router.push("/search")

  return (
    <Layout>
      <div className="w-full flex flex-col mt-[26px] mb-4 mx-0">
        <div className="w-full flex justify-between items-baseline mb-3.5">
          <p className="text-[19px] not-italic font-semibold leading-[100%]">공지사항</p>
          <IconButton onClick={handleSearch} style={{ color: '#0B834B' }} >
            <SearchIcon />
          </IconButton>
        </div>
        <div className="flex flex-col gap-3.5">
          {props.data.filter((el:any) => el).map((el:any) => {
              return <BasicPostItem key={el.id} user_id={props.user_id} id={el.id} title={el.title} picks={el.picks} content={el.content} images={el.image} Pick={el.Pick} />
          })}
        </div>
      </div>
    </Layout>
  );
};

export default NoticePage;
