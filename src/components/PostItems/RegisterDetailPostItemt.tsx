import Image from "next/image";
import styled from "styled-components";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
interface Props {
  title?: string;
  descriptoin?: string;
  imageUrl?: string;
}

const RegisterDetailPostItemt = ({ title, descriptoin, imageUrl }: Props) => {
  {
    /* TODO: Implement OnClick Post and Detail Page */
  }
  return (
    <Container hasImage={!!imageUrl}>
      <Image
        alt="demo-image"
        src={
          "https://s3-alpha-sig.figma.com/img/a1a2/8c8f/523932a06ba32c0de03ed826ece1f567?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XacIPz2B0km~EbRo2XwcBM3nLjGABAwxAo5kJx-Etq31zNLeCSUruZFaanUPYE2fetJqlHKzbyCjXw4GDxxdRmw~SqPaGJ4fLQsqiY0kv5jGjqlxT3gLH0Xi-EyRuUA9xshos5W7nXw4MZEzM5UkCWzshVy33cqMWxoNeIPbmzcJSjdJdRmK6Arb2RlJELPc24xQFIqOgE0dLEe8Q6XDKNnaFo5WCjVeVqbH~bW8DMCoXeAdPTrEpIFOgj5XhZByg4L5vPuYRENZGcvBkTo2af3OZdHToTsBE9ZCLswo7RpLMAjW9~t5oZ19uVyYX2cMv776VNEdmbMOB2c3UQKO3g__"
        }
        width={120}
        height={90}
        style={{ borderRadius: "6px" }}
      />
      <ColDiv>
        <PostTitle>게시판 글 제목입니다</PostTitle>
        <PostDescription>
          동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세
          동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
          만세동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
          만세동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세
        </PostDescription>
      </ColDiv>
      {/* TODO: Turn ON/OFF icon according data */}
      <TouchAppOutlinedIcon />
    </Container>
  );
};

export default RegisterDetailPostItemt;

const Container = styled.div<{ hasImage?: boolean }>`
  cursor: pointer;
  display: flex;
  padding: 8px;
  padding: ${(props) => (props.hasImage ? "8px" : "20px 18px")};
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
