import BasicPostItem from "../components/PostItems/BasicPostItem";
import styled from "styled-components";
import BottomNav from "@/components/BottomNav";
import NavBar from "@/components/NavBar";

const MyPickPage = () => {
  return (
    <Wrapper>
      <NavBar title="나의 Pick 모아보기" />
      {/* TODO: Implement Top Back Nav */}
      <Container>
        <RowDiv>
          <Title>Pick 리스트</Title>
        </RowDiv>
        {/* TODO: Implement OnClick event and search Page */}
        <PostItemList>
          {[1, 2, 3, 4].map((el, idx) => {
            return <BasicPostItem key={idx} imageUrl={"true"} />;
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
