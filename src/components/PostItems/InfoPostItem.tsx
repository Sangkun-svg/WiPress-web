import styled from "styled-components";

interface Props {}

const InfoPostItem = () => {
  return (
    <Container>
      <ColDiv>
        <PostTitle>게시판 글 제목입니다</PostTitle>
        <PostDescription>
          동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화
          삼천리 화려강산 대한사람 대한으로 길이 보전하세
        </PostDescription>
      </ColDiv>
    </Container>
  );
};

export default InfoPostItem;

const Container = styled.div`
  display: flex;
  padding: 8px;
  border-radius: 6px;
  background: #f7f7fa;
  gap: 10px;
`;

const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const PostTitle = styled.p`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;
const PostDescription = styled.p`
  color: #222;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;
