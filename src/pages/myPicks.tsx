import BasicPostItem from "../components/PostItems/BasicPostItem";
import styled from "styled-components";
import BottomNav from "@/components/BottomNav";
import NavBar from "@/components/NavBar";
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
    <Wrapper>
      <NavBar title="나의 Pick 모아보기" />
      <Container>
        <RowDiv>
          <Title>Pick 리스트</Title>
        </RowDiv>
        <PostItemList>
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
        </PostItemList>
      </Container>
      <BottomNav />
    </Wrapper>
  );
};

export default MyPickPage;

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 16px;
`;
const Container = styled.div`
  width: 100%;
  margin: 26px 0 16px;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px; /* Adjust as needed */
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
