import { useRouter } from "next/navigation";
import styled from "styled-components";

interface Props {
    post: any
}

const NoticePostItem = ({post} : Props) => {
  const router = useRouter();
  const handleClick = () => { router.push("/notice/" + post.id)}
  return (
    <Container onClick={handleClick}>
      <ColDiv>
        <PostTitle>{post.title}</PostTitle>
        <PostDescription>
            {post.content}
        </PostDescription>
      </ColDiv>
    </Container>
  );
};

export default NoticePostItem;

const Container = styled.div`
  cursor:pointer;
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
