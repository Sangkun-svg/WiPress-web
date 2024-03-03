import Layout from "../components/Layout";
import ArticlePostItem from "../components/PostItems/ArticlePostItem";
import styled from "styled-components";
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
      <Container>
        <RowDiv>
          <Title>기사 게시판</Title>
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </RowDiv>
        <PostItemList>
          {props.data.map((el:any) => {
            return <ArticlePostItem key={el.link} title={el.title} link={el.link}/>
          })}
        </PostItemList>
      </Container>
    </Layout>
  );
};

export default ArticlePage;

const Container = styled.div`
  width: 100%;
  margin: 26px 0 16px;
  display: flex;
  flex-direction: column;
`;

const PostItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const RowDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 14px;
`;

const Title = styled.p`
  color: #000;
  font-size: 19px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
`;
