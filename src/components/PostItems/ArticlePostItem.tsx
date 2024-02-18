import styled from "styled-components";

interface Props {}

const ArticlePostItem = () => {
  return (
    <Container>
      <ColDiv>
        <PostTitle>게시판 글 제목입니다</PostTitle>
        <PostDescription>
          https://www.youtube.com/watch?v=nJMt2-XYN5E
        </PostDescription>
      </ColDiv>
      {/* TODO: Turn ON/OFF icon according data */}
    </Container>
  );
};

export default ArticlePostItem;

const Container = styled.div`
  display: flex;
  padding: 8px;
  /* TODO: Change Padding Value accoding to has ImageURL  */
  /* ImageURL ? 8px : 20px 18px */
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
