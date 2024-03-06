import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";

interface Props {
  label: string;
  type: string;
  data?: Array<string>; // origin data from db
}

const ShortBoard = ({ label, type, data }: Props) => {
  const router = useRouter();
  const handleMoveDetail = (id: string) => {
    router.push(`${type}/${id}`)
  }
  return (
    <Container>
      <RowDiv>
        <Title>{label} 게시판</Title>
        <AllLink href={`/${type}`}>전체보기</AllLink>
      </RowDiv>
      <PostPreviewList>
        {data?.map((el:any) => {
          const post = type === "registerPost" ? el.Post : el;
          if(!post) return null;
          return <PostPreviewItem key={el.id} onClick={() => handleMoveDetail(post.id)}>{post?.title}</PostPreviewItem>
        })}
      </PostPreviewList>
    </Container>
  );
};

export default ShortBoard;

const Container = styled.div`
  width: 100%;
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
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
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
