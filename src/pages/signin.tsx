import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { useState } from "react";
import { CircularProgress } from "@mui/material"; // MUI CircularProgress 추가
import { Backdrop } from "@mui/material";

export const getServerSideProps = async (context: any) => {
  const req = context.req as any;
  const res = context.res as any;
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
};

const SignInPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [isSigninFail, setIsSigninFail] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const moveToSignUpTypePage = () => router.push("/signupType");

  const onSubmit: SubmitHandler<any> = async (data: {
    phoneNumber: string;
    password: string;
  }) => {
    setIsLoading(true);
    const res = await signIn("credentials", {
      phoneNumber: data.phoneNumber,
      password: data.password,
      redirect: false,
    });

    if (res?.status === 401) {
      setIsSigninFail(true);
      setIsLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <Container>
      {isLoading && 
        <Backdrop open={isLoading}>
          <CircularProgress size={24} color="inherit" />
        </Backdrop>
      }
      <Image alt="Logo" src={"/WiPressLogo.webp"} width={210} height={130} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="아이디를 입력해 주세요"
          {...register("phoneNumber")}
        />
        <Input
          placeholder="비밀번호를 입력해 주세요"
          type={"password"}
          {...register("password")}
        />
        {isSigninFail && (
          <SigninFailBox>
            <p>
              아이디 혹은 비밀번호가 일치하지 않습니다. 입력한 내용을 다시 확인해
              주세요.
            </p>
          </SigninFailBox>
        )}

        <Button type="submit">
        <p>로그인</p>
        </Button>
      </Form>
      <OutLineButton onClick={moveToSignUpTypePage}>
        <p>회원가입</p>
      </OutLineButton>
    </Container>
  );
};

export default SignInPage;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 16px;
  margin: 0 auto;
`;

const SigninFailBox = styled.div`
  border-radius: 8px;
  padding: 20px;
  line-height: 20px;
  background-color: #fafafa;
  p {
    font-size: 13px;
    color:#e65f3e;
  }
`;

const Form = styled.form`
  width: 100%;
  margin-top: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 14px;
`;

const Input = styled.input`
  width: 100%;
  max-height: 50px;
  border-radius: 6px;
  padding: 18px 16px;
  background-color: #f7f7fa;
`;

const Button = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 50px;
  padding: 18px 12px;
  border-radius: 6px;
  background-color: #000;
  p {
    color: #fff;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    letter-spacing: 0.14px;
  }
`;

const OutLineButton = styled(Button)`
  width: calc(100% - 1px);
  border: 1px solid #000;
  margin-top: 14px;
  background-color: #fff;
  p {
    color: #000;
  }
`;
