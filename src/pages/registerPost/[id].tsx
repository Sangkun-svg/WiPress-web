import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";

interface Props {}

const RegisterPostDetail = () => {
  const [images, setImages] = useState([]);
  return (
    <Container>
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
        {/* TODO: implement multiple Images */}
        {/* <Image /> */}
      </ContentContainer>
      <RowDiv>
        <FavoriteBorder />
        <FavoriteText>35</FavoriteText>
      </RowDiv>
      <IosShareOutlinedIcon />
      <FileButton>
        <InsertLinkOutlinedIcon />
        <p>파일 보기</p>
      </FileButton>
      <input id="file" type="file" className="hidden" />
      <CommnetTitleText>댓글 {6}</CommnetTitleText>
      {/* TODO: set condition according user status (isPicked) */}
      <Input placeholder="ex. Pick한 기자만 댓글을 달 수 있습니다" />
    </Container>
  );
};

export default RegisterPostDetail;

const Container = styled.div``;
const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px 16px 28px;
  background: #f7f7fa;
  gap: 14px;
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
  font-weight: 300;
  line-height: 170%;
`;

const FileButton = styled.button`
  display: flex;
  width: 129px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  align-self: stretch;
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
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 16px */
  letter-spacing: 0.16px;
`;

const RowDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CommnetTitleText = styled.p`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 15px */
`;
const Input = styled.input`
  width: 100%;
  max-height: 50px;
  border-radius: 6px;
  padding: 18px 16px;
  background-color: #f7f7fa;
`;
