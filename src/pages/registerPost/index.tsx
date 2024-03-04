import Layout from "../../components/Layout";
import BasicPostItem from "../../components/PostItems/BasicPostItem";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth";
import { supabase } from "@/utils/database";
import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
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
      <Container>
        <RowDiv>
          <Title>보도요청 게시판</Title>
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </RowDiv>
        <PostItemList>
          {post?.map((el:any) => {
              if(!el.Post) return <></>;
              return <BasicPostItem key={el.Post.id} user_id={user_id} id={el.Post.id} title={el.Post.title} picks={el.Post.picks} content={el.Post.content} images={el.Post.image} Pick={el.Post.Pick} />
          })}
        </PostItemList>
      </Container>
    </Layout>
  );
};

export default RegisterPost;

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
