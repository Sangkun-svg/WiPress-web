import styled from "styled-components";
import { Avatar, Badge } from "@mui/joy";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BottomNav from "@/components/BottomNav";
import { useRouter } from "next/router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Items = [
  { label: "나의 Pick 모아보기", path: "/myPicks" },
  { label: "로그아웃", path: "/logout" },
  { label: "계정삭제", path: "/deleteAccount" },
  { label: "개인정보처리방침", path: "/police/personal" },
  { label: "기타", path: "#" },
  { label: "기타", path: "#" },
];

const MyPage = () => {
  const router = useRouter();
  const handleItemClick = (path: string) => router.push(path);

  return (
    <>
      <Container>
        <Title>마이페이지</Title>
        <ProfileContinaer>
          <div style={{ display: "flex" }}>
            <Badge
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="plain"
              badgeContent={
                <AddCircleOutlineOutlinedIcon style={{ color: "#000" }} />
              }
              badgeInset="14%"
              sx={{ "--Badge-paddingX": "0px" }}
            >
              <Avatar style={{ width: "84px", height: "84px" }} />
            </Badge>
            <ColDiv>
              <NameText>홍길동</NameText>
              <UserInfoText>기자</UserInfoText>
              <UserInfoText>A소속</UserInfoText>
            </ColDiv>
          </div>
          <Button>
            <EditOutlinedIcon />
            <p>편집</p>
          </Button>
        </ProfileContinaer>
        <ItemList>
          {Items.map((el, idx) => {
            return (
              <Item key={idx} onClick={() => handleItemClick(el.path)}>
                <p>{el.label}</p>
                <ArrowForwardIosIcon style={{ color: "#D4D4D4" }} />
              </Item>
            );
          })}
        </ItemList>
      </Container>
      <BottomNav />
    </>
  );
};

export default MyPage;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 26px 16px 0;
  display: flex;
  flex-direction: column;
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
