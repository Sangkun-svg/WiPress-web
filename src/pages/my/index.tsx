import styled from "styled-components";
import { Avatar } from "@mui/joy";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BottomNav from "@/components/BottomNav";
import { useRouter } from "next/router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { signOut } from "next-auth/react";
import { getServerSession } from "next-auth";
import { supabase } from "@/utils/database";
import { useRef } from "react";
import { authOptions } from "../api/auth/[...nextauth]";

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
  const { data: User, error } = await supabase
      .from('User')
      .select()
      .eq("id", (session?.user as any).id);
        
  return {props : {
    user: User![0],
    isAuthenticated : !!session
  }}
}

const MyPage = ({user}: any) => {
  const router = useRouter();
  const modalRef = useRef(null);
  // TODO: replace using env
  const BASE_URL = "https://jjgkztugfylksrcdbaaq.supabase.co/storage/v1/object/public/"


  const handleMove = (path: string) => router.push(path);
  const handleSignOut = async () => signOut({ callbackUrl: `/` })
  const handleDeleteUser = async () => {
    const { error } = await supabase
    .from('User')
    .delete()
    .eq('id', user.id);
    if(error) throw new Error("delete user error")
    router.push("/")
  }

  return (
    <Container>
      <MainContent>
      <Title>마이페이지</Title>
      <ProfileContinaer>
        <div style={{ display: "flex"}}>
          <Avatar style={{ width: "84px", height: "84px" }} src={user.profile ? BASE_URL + user.profile : ""}/>
          <ColDiv>
            <NameText>{user.name}</NameText>
            <UserInfoText>{user.party}기자</UserInfoText>
            <UserInfoText>{user.position}소속</UserInfoText>
          </ColDiv>
        </div>
        <Button onClick={() => handleMove("/my/update")}>
          <EditOutlinedIcon />
          <p>편집</p>
        </Button>
      </ProfileContinaer>
      <ItemList>
        <Item onClick={() => handleMove("/myPicks")}>
          <p>나의 Pick 모아보기</p>
          <ArrowForwardIosIcon style={{ color: "#D4D4D4" }} />
        </Item>
        <Item onClick={handleSignOut}>
          <p>로그아웃</p>
          <ArrowForwardIosIcon style={{ color: "#D4D4D4" }} />
        </Item>
        <Item onClick={handleDeleteUser}>
          <p>계정삭제</p>
          <ArrowForwardIosIcon style={{ color: "#D4D4D4" }} />
        </Item>
        <Item onClick={() => handleMove("/police/personal")}>
          <p>개인정보처리방침</p>
          <ArrowForwardIosIcon style={{ color: "#D4D4D4" }} />
        </Item>
      </ItemList>
      </MainContent>
      <BottomNav />
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 26px 16px 0;
  min-height: 100vh; /* Changed height to min-height */
`;

const MainContent = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 60px; /* Adjust as needed */
`;

const ProfileContinaer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 26px 0 14px;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Item = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-height: 64px;
  padding: 24px 6px;
  &:not(:last-child) {
    border-bottom: 1px solid #e5e5ea;
  }
  p {
    color: #222;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    letter-spacing: 0.15px;
  }
`;

const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  margin-left: 12px;
`;

const Title = styled.p`
  color: #000;
  font-size: 19px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
`;

const NameText = styled.p`
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;
const UserInfoText = styled.p`
  color: #4a4a4a;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 34px;
  padding: 6px 14px;
  border-radius: 6px;
  background-color: #f7f7fa;
  gap: 4px;
  p {
    color: #4a4a4a;
    text-align: center;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    letter-spacing: 0.14px;
  }
`;
