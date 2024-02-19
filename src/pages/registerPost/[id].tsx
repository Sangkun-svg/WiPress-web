import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import NavBar from "@/components/NavBar";
import ImageSwiper from "@/components/ImageSwiper";
import BasicPostItem from "@/components/PostItems/BasicPostItem";

const RegisterPostDetail = () => {
  const [comment, setComment] = useState<string>("");
  const handleComment = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };
  return (
    <Container>
      <NavBar title={"보도자료 게시글"} />
      <ContentContainer>
        <Title>제목입니다</Title>
        <SubTitle>부제목입니다</SubTitle>
        <Description>
          동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
          만세동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
          만세동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
          만세동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
          만세동해물과 두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세
          동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
          만세동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
          만세동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
          만세동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세
          동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세
        </Description>
        <ImageSwiper />
      </ContentContainer>
      <ActionContainer>
        {/* TODO<SERVER>: isLike ? colorFIll : outline */}
        <LikeContainer>
          <FavoriteBorder />
          <FavoriteText>35</FavoriteText>
          <IosShareOutlinedIcon style={{ marginLeft: "24px" }} />
        </LikeContainer>
        <FileButton>
          <FolderOutlinedIcon />
          <p>파일 열기</p>
        </FileButton>
        <input id="file" type="file" className="hidden" />
      </ActionContainer>
      <CommentContainer>
        <CommentCount>댓글 {6}</CommentCount>
        {/* TODO: set input disabled according user status (isPicked) */}
        <CommentInput
          value={comment}
          onChange={handleComment}
          placeholder="ex. Pick한 기자만 댓글을 달 수 있습니다"
        />
      </CommentContainer>
      <CommentList>
        {[
          ["기자A · A소속", "댓글입니다 동해물과 백두산이 마르고", "5분"],
          ["기자B · B소속", "댓글입니다 동해물과 백두산이 마르고", "1분"],
        ].map((el, idx) => {
          return (
            <CommentItem key={idx}>
              <p>{el[0]}</p>
              <p>{el[1]}</p>
              <p>{el[2]}</p>
            </CommentItem>
          );
        })}
      </CommentList>
      <ReporterContainer>
        {/* TODO<Client>: should be abstrative */}
        <CommentCount>Pick한 기자</CommentCount>
        {[1, 2, 3].map((el, idx) => {
          return (
            <ReporterItem key={idx}>
              <div
                className="demoImage"
                style={{
                  width: "84px",
                  height: "84px",
                  borderRadius: "6px",
                  background: "#F2F2F7",
                }}
              />
              <ReporterTypoWrapper>
                <ReporterTypo color="#000" fontSize="14px">
                  홍길동
                </ReporterTypo>
                <ReporterTypo color="#4A4A4A" fontSize="13px">
                  기자
                </ReporterTypo>
                <ReporterTypo color="#4A4A4A" fontSize="13px">
                  A소속
                </ReporterTypo>
                <ReporterTypo color="#848487" fontSize="13px">
                  비고 한줄 긴글 동해물과 백두산이 마르고
                </ReporterTypo>
              </ReporterTypoWrapper>
            </ReporterItem>
          );
        })}
      </ReporterContainer>
      <MyPickContainer>
        {/* TODO<Client>: 작성완료/미완료 Chip 만들기 */}
        <CommentCount>나의 Pick 현황</CommentCount>
        {[1, 2, 3].map((el, idx) => {
          {
            /* TODO<Client>: should be abstrative */
          }
          return <BasicPostItem key={idx} imageUrl={"true"} />;
        })}
      </MyPickContainer>
    </Container>
  );
};

export default RegisterPostDetail;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;
const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px 16px 28px;
  background: #f7f7fa;
  gap: 13px;
`;
const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  margin: 18px 0 22px;
`;
const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const CommentContainer = styled.div`
  padding: 0 16px;
`;
const CommentCount = styled.p`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 15px */
  margin-bottom: 10px;
`;
const CommentInput = styled.input`
  width: 100%;
  max-height: 50px;
  border-radius: 6px;
  padding: 18px 16px;
  background-color: #f7f7fa;
`;
const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;
  padding: 0 16px;
  margin: 18px 0 28px;
`;
const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  p {
    color: #636366;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
  }
`;

const ReporterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  padding: 0 16px;
`;

const ReporterItem = styled.div`
  display: flex;
`;

const ReporterTypoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  margin-left: 12px;
`;

const ReporterTypo = styled.p<{ color: string; fontSize: string }>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

const MyPickContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  padding: 0 16px;
  margin: 28px 0;
`;

const FileButton = styled.button`
  display: flex;
  width: 129px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  background: #f7f7fa;
  p {
    color: #303030;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    letter-spacing: 0.14px;
    margin: 0;
    white-space: nowrap;
  }
`;

const FavoriteText = styled.p`
  color: #303030;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: 0.16px;
`;
const Title = styled.p`
  color: #000;
  font-size: 19px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
`;
const SubTitle = styled.p`
  color: #4a4a4a;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;

const Description = styled.text`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
`;
