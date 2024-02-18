import Link from "next/link";
import styled from "styled-components";

interface Props {
  label: string;
  type: string;
  data?: Array<string>; // origin data from db
}

const ShortBoard = ({ label, type, data }: Props) => {
  return (
    <Container>
      <RowDiv>
        <Title>{label} 게시판</Title>
        <AllLink href={`/${type}`}>전체보기</AllLink>
      </RowDiv>
      <PostPreviewList>
        {/* TODO: data.map and clickable && add onClick action */}
        <PostPreviewItem>동해물과 백두산이 마르고 닳도록</PostPreviewItem>
        <PostPreviewItem>동해물과 백두산이 마르고 닳도록</PostPreviewItem>
        <PostPreviewItem>동해물과 백두산이 마르고 닳도록</PostPreviewItem>
        <PostPreviewItem>동해물과 백두산이 마르고 닳도록</PostPreviewItem>
      </PostPreviewList>
    </Container>
  );
};

export default ShortBoard;

const Container = styled.div`
  max-width: 358px;
  width: calc(100% - 16px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const RowDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const PostPreviewList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 4px;
`;

const PostPreviewItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  min-width: 358px;
  min-height: 46px;
  &:not(:last-child) {
    border-bottom: 1px solid #e5e5ea;
  }
  p {
    color: #000;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: 100%;
    letter-spacing: 0.15px;
  }
`;

const Title = styled.p`
  color: #000;
  font-size: 19px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
`;

const AllLink = styled(Link)`
  color: #8e8e93;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;
