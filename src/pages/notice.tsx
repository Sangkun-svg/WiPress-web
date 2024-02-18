import Layout from "../components/Layout";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import BasicPostItem from "../components/PostItems/BasicPostItem";
interface Props {}

const NoticePage = () => {
  return (
    <Layout>
      <Container>
        <RowDiv>
          <Title>공지사항</Title>
          <SearchIcon />
        </RowDiv>
        {/* TODO: Implement OnClick event and search Page */}
        <PostItemList>
          <BasicPostItem />
          <BasicPostItem />
          <BasicPostItem />
          <BasicPostItem />
        </PostItemList>
      </Container>
    </Layout>
  );
};

export default NoticePage;

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
