import { supabase } from "@/utils/database";
import styled from "styled-components";
import Layout from "../components/Layout";
import ShortBoard from "../components/ShortBoard";

export const getServerSideProps = async () => { 
  try {
    const { data: registerPost, error: registerPostError } = await supabase.from("Post").select("*").eq("type", "registerPost").range(0, 3).order("created_at", { ascending: false });
    const { data: article, error: articleError } = await supabase.from("Post").select("*").eq("type", "article").range(0, 3).order("created_at", { ascending: false });
    const { data: notice, error: noticeError } = await supabase.from("Post").select("*").eq("type", "notice").range(0, 3).order("created_at", { ascending: false });
    const { data: info, error: infoError } = await supabase.from("Post").select("*").eq("type", "info").range(0, 3).order("created_at", { ascending: false });

    if (registerPostError || articleError || noticeError || infoError) {
      throw new Error("데이터 가져오기 중에 오류가 발생했습니다.");
    }

    return {
      props: {
        posts: [
          { label: "보도요청", type: "registerPost", data: registerPost },
          { label: "전체기사", type: "article", data: article },
          { label: "공지사항", type: "notice", data: notice },
          { label: "자료실", type: "info", data: info },
        ],
      },
    };
  } catch (error) {
    console.error(error);
  }
}


const Home = (props: any) => {
  console.log(props.posts)
  return (
    <Layout>
      <Container>
        {props.posts.map((el:any) => {
          return <ShortBoard key={el.type} type={el.type} label={el.label} data={el.data}/>
        })}
      </Container>
    </Layout>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
  margin: 26px 0 16px;
  display: flex;
  flex-direction: column;
  gap: 32px 0;
`;
