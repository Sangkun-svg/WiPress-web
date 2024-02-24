import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const SignInPage = () => {
  const router = useRouter();
  const { data: user, status } = useSession();
  const moveToSignUpTypePage = () => router.push("/signupType");
  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<any> = async (data: {
    phoneNumber: string;
    password: string;
  }) => {
    signIn("credentials", {
      phoneNumber: data.phoneNumber,
      password: data.password,
      redirect: false,
    });
  };

  const logout = () =>
    signOut({
      redirect: false,
    });
  console.log({ user, status });
  useEffect(() => {
    console.log({ user, status });
  }, []);

  return (
    <Container>
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
        {/* TODO: 로그인 실패 시 UI  */}
        <Button type="submit">
          <p>로그인</p>
        </Button>
        <Button type="button" onClick={logout}>
          <p>로그아웃</p>
        </Button>
      </Form>
      {/* <AnchorRow>
        <Link href={"/findId"}>아이디 찾기</Link>
        <p>/</p>
        <Link href={"/findPw"}>비밀번호 찾기</Link>
      </AnchorRow> */}
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

const Form = styled.form`
  width: 100%;
  margin-top: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 14px;
`;

const AnchorRow = styled.div`
  display: flex;
  gap: 0 4px;
  margin-top: 24px;
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
  margin-top: 48px;
  background-color: #fff;
  p {
    color: #000;
  }
`;
