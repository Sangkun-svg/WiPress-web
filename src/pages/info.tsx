import Layout from "../components/Layout";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import InfoPostItem from "../components/PostItems/InfoPostItem";
import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";

interface Props {}

const InfoPage = () => {
  const router = useRouter();
  const handleSearch = () => router.push("/search")

  return (
    <Layout>
      <Container>
        <RowDiv>
          <Title>여론분석 게시판</Title>
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </RowDiv>
        <PostItemList>
          <InfoPostItem />
          <InfoPostItem />
          <InfoPostItem />
          <InfoPostItem />
        </PostItemList>
      </Container>
    </Layout>
  );
};

export default InfoPage;

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
