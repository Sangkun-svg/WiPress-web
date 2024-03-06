import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";
import DaumPostcodeEmbed from "react-daum-postcode";
import { Backdrop, Checkbox, CircularProgress } from "@mui/material";
import NavBar from "../components/NavBar";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]"

export const getServerSideProps = async (context:any) => { 
  const req = context.req as any;
  const res = context.res as any;
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
 return { props: {} } 
}

const SignUpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const signUpType = searchParams.get("type");
  const { register, handleSubmit } = useForm();
  const [address, setAddress] = useState<string>("");
  const [openPostModal, setOpenPostModal] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAlreadyRegisterd, setIsAlreadyRegisterd] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);

  const handleModal = () => setOpenPostModal((prev: boolean) => !prev);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") extraAddress += data.bname;
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddress(fullAddress);
    setOpenPostModal(false);
  };


  const onSubmit = async (data:any) => {
    try {
      setIsLoading(true);
      const result = await axios.post("/api/signup", {
        data: {
          ...data,
          address: address,
          agreePushAlarm: checked,
          type: signUpType,
        },
      });
      if (result.status === 206) {
        setIsAlreadyRegisterd(true)
      } else if (result.status === 207) {
        setIsFailed(true)
      }else {
        setIsLoading(false);
        router.push("/signin");
      }
    } catch (error) {
      
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress/>
        </Backdrop>
        <NavBar title={"회원가입"} />
        <FormElement>
          <Label>휴대폰 번호</Label>
          <Input
            maxLength={11}
            onKeyPress={(event:any) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            placeholder="ex. 010-0000-0000"
            {...register("phoneNumber",{ required: true })}
          />
          {
            isAlreadyRegisterd && <SigninFailBox>
              <p>이미 가입된 번호입니다.</p>
            </SigninFailBox>
          }
        </FormElement>
        <FormElement>
          <Label>비밀번호</Label>
          <Input
            placeholder="비밀번호를 입력해주세요"
            {...register("password",{ required: true })}
          />
        </FormElement>
        <FormElement>
          <Label>이름</Label>
          <Input placeholder="ex. 홍길동" {...register("name",{ required: true })} />
        </FormElement>
        <FormElement>
          <Label>생년월일</Label>
          <Input
            onKeyPress={(event:any) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            placeholder="ex. 1990-03-10"
            {...register("birth",{ required: true })}
          />
        </FormElement>
        <FormElement>
          <Label>주소</Label>
          <div style={{ display: "flex", gap: 10 }}>
            <Input
              disabled
              value={address}
              style={{ width: "75%" }}
              placeholder="우편번호를 검색하세요"
            />
            <Button
              type="button"
              style={{ width: "25%" }}
              onClick={handleModal}
            >
              <p>우편번호 검색</p>
            </Button>
          </div>
          {openPostModal && (
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
                padding: "0 16px",
              }}
              open={openPostModal}
              onClick={handleModal}
            >
              <DaumPostcodeEmbed onComplete={handleComplete} />
            </Backdrop>
          )}
          <Input
            placeholder="상세주소를 입력하세요 (ex. 101호 101호)"
            {...register("addressDetail",{ required: true })}
          />
        </FormElement>
        <FormElement>
          <Label>소속</Label>
          <Input placeholder="ex. 00소속" {...register("party",{ required: true })} />
        </FormElement>
        <FormElement>
          <Label>직책</Label>
          <Input placeholder="ex. 00직책" {...register("position",{ required: true })} />
        </FormElement>
        <div style={{ width: "100%", display: "flex", height: "24px" }}>
          <Checkbox
            size="small"
            required={true}
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <p style={{ margin: 0 }}>앱 푸시 알람 수신에 동의합니다</p>
        </div>
        {
          isFailed && <SigninFailBox>
            <p>회원가입에 실패했습니다. 다시 시도해주세요</p>
          </SigninFailBox>
        }
        <Button type="submit">
          <p>제출하기</p>
        </Button>
      </Form>
  );
};

const SigninFailBox = styled.div`
  border-radius: 8px;
  padding: 4px 20px;
  line-height: 20px;
  background-color: #fafafa;
  p {
    font-size: 13px;
    color:#e65f3e;
  }
`;

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 18px 16px 12px;
  gap: 30px;
`;

const FormElement = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

const Label = styled.label`
  width: 100%;
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
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
export default SignUpPage;
