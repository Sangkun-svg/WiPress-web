import { Layout, ArticlePostItem } from "@/components";
import SearchIcon from "@mui/icons-material/Search";
import { supabase } from "@/utils/database";
import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";

export const getServerSideProps = async () => { 
  const { data, error } = await supabase
  .from("Post")
  .select("*")
  .eq("type", "article")
  .order("created_at", {ascending: false});
  
  if(error) throw new Error(error.message);
  
  return {
    props: {
      data: data,
    }
  }
}

const ArticlePage = (props:any) => {
  const router = useRouter();
  const handleSearch = () => router.push("/search")
  return (
    <Layout>
      <div className="w-full flex flex-col mt-[26px] mb-4 mx-0">
        <div className="w-full flex justify-between items-baseline mb-3.5">
          <p className="text-[19px] not-italic font-semibold leading-[100%]">기사 게시판</p>
          <IconButton onClick={handleSearch} style={{ color: '#0B834B' }} >
            <SearchIcon />
          </IconButton>
        </div>
        <div className="flex flex-col gap-3.5">
          {props.data.map((el:any) => {
            return <ArticlePostItem key={el.link} title={el.title} link={el.link}/>
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ArticlePage;