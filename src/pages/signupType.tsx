import { useRouter } from "next/router";
import styled from "styled-components";

const SignUpType = ["requester", "reporter"] as const;

const SignUpTypePage = () => {
  const router = useRouter();
  const moveToSignUp = (type: (typeof SignUpType)[number]) =>
    router.push("/signup?type=" + type);

  return (
    <Container>
      <TextWrapper>
        <p style={{ fontWeight: 500 }}>위스에 오신 걸 환영합니다 :)</p>
        <p style={{ fontWeight: 400 }}>회원가입 종류를 선택해주세요 </p>
      </TextWrapper>
      <ButtonWrapper>
        <Button onClick={() => moveToSignUp("requester")}>
          {/* icon 추가 */}
          <p>보도요청용 회원가입</p>
        </Button>
        <Button onClick={() => moveToSignUp("reporter")}>
          {/* icon 추가 */}
          <p>기자용 회원가입</p>
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

export default SignUpTypePage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 16px;
`;
const TextWrapper = styled.div`
  width: 100%;
  margin-bottom: 34px;
  p {
    color: #000;
    font-size: 18px;
    font-style: normal;
    line-height: 170%;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

const Button = styled.button`
  width: calc(100% - 1px);
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 50px;
  padding: 18px 12px;
  border-radius: 6px;
  background-color: #fff;
  p {
    color: #000;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    letter-spacing: 0.14px;
  }
`;
