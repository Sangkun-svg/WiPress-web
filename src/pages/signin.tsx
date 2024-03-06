import Image from "next/image";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { useState } from "react";
import { Backdrop ,CircularProgress} from "@mui/material";
import { Input } from "@/components";

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
    <div className="h-dvh" style={{backgroundColor:"#F0F6F4"}}>
      <div className="w-full max-w-[600px] flex justify-center items-center flex-col mx-auto my-0 pt-36 pb-0 px-4">
        {isLoading && 
          <Backdrop open={isLoading}>
            <CircularProgress size={24} color="inherit" />
          </Backdrop>
        }
        <Image alt="Logo" src={"/WiPressLogo.webp"} width={210} height={130} />
        <form className="w-full mt-12 flex justify-center items-center flex-col" onSubmit={handleSubmit(onSubmit)} style={{gap: 14}}>
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
            <div className="leading-5 bg-neutral-50 p-5 rounded-lg">
              <p className="text-[13px] text-[#e65f3e]">아이디 혹은 비밀번호가 일치하지 않습니다. 입력한 내용을 다시 확인해주세요.</p>
            </div>
          )}
          <button className="w-full flex justify-center items-center bg-[#0B834B] px-3 py-[18px] rounded-md" type="submit">
            <p className="text-white text-center text-sm not-italic font-normal leading-[100%] tracking-[0.14px]">로그인</p>
          </button>
        </form>
        <button className="border bg-white w-full flex justify-center items-center mt-3.5 px-3 py-[18px] rounded-md border-solid border-[#0B834B]" onClick={moveToSignUpTypePage}>
        <p className="text-black text-center text-sm not-italic font-normal leading-[100%] tracking-[0.14px]">회원가입</p>
        </button>
      </div>
    </div>
  );
};

export default SignInPage;