import { supabase } from "@/utils/database";
import { Layout } from "@/components";
import SearchIcon from "@mui/icons-material/Search";
import InfoPostItem from "../components/PostItems/InfoPostItem";
import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";

export const getServerSideProps = async () => { 
  const { data, error } = await supabase
  .from("Post")
  .select("*")
  .eq("type", "info")
  .order("created_at", {ascending: false});
  
  if(error) throw new Error(error.message);
  
  return {
    props: {
      data: data,
    }
  }
}
const InfoPage = (props:any) => {
  console.log(props)
  const router = useRouter();
  const handleSearch = () => router.push("/search")

  return (
    <Layout>
      <div className="w-full flex flex-col mt-[26px] mb-4 mx-0">
        <div className="w-full flex justify-between items-baseline mb-3.5">
          <p className="text-[19px] not-italic font-semibold leading-[100%]">여론분석 게시판</p>
          <IconButton onClick={handleSearch} style={{ color: '#0B834B' }} >
            <SearchIcon />
          </IconButton>
        </div>
        <div className="flex flex-col gap-3.5">
          {props.data.map((el:any) => {
            return <InfoPostItem key={el.id} id={el.id} title={el.title} content={el.content} />
          })}
        </div>
      </div>
    </Layout>
  );
};

export default InfoPage;
