import { InputHTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import DaumPostcodeEmbed from "react-daum-postcode";
import { Backdrop, Checkbox, CircularProgress } from "@mui/material";
import { NavBar} from "@/components";
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

  interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label:string; 
    registerType:string;
  }


  const InputWithLabel = ({label,registerType,...rest}:InputProps) => {
    return (
      <div className='flex flex-col w-full gap-2.5'>
        <label className='text-[15px] not-italic font-medium leading-[100%]'>{label}</label>
        <input className='w-full max-h-[50px] px-4 py-[18px] rounded-md' {...rest} {...register(registerType, { required: true })}/>
      </div>
    )
  }


  return (
      <form className="max-w-[600px] flex flex-col gap-[30px] bg-[#F0F6F4] mx-auto my-0 pt-[18px] pb-3 px-4" onSubmit={handleSubmit(onSubmit)}>
        <Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress/>
        </Backdrop>
        <NavBar title={"회원가입"} />
        <InputWithLabel
          label="이름"
          placeholder="ex. 홍길동"
          registerType="name"
        />
        <InputWithLabel
          label="휴대폰 번호"
          maxLength={11}
          placeholder="ex. 010-0000-0000"
          registerType="phoneNumber"
          onKeyPress={(event:any) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
        {
          isAlreadyRegisterd && <div className="leading-5 bg-neutral-50 px-5 py-1 rounded-lg">
            <p className="text-[13px] text-[#e65f3e]">이미 가입된 번호입니다.</p>
          </div>
        }
        <InputWithLabel
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          registerType="password"
        />
        <InputWithLabel
          label="생년월일"
          placeholder="ex. 1990-03-10"
          registerType="birth"
          onKeyPress={(event:any) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
        <div className='flex flex-col w-full gap-2.5'>
          <label className='text-[15px] not-italic font-medium leading-[100%]'>주소</label>
          <div className='flex gap-[10px]'>
            <input 
              className='w-9/12 max-h-[50px] px-4 py-[18px] rounded-md'
              value={address}
              placeholder="우편번호를 검색하세요"
              readOnly
            />
            <button
              className="w-3/12 flex justify-center items-center max-h-[50px] bg-[#0B834B] px-3 py-[18px] rounded-md"
              type="button"
              onClick={handleModal}
            >
              <p className="text-white text-center text-sm not-italic font-normal leading-[100%] tracking-[0.14px]">우편번호 검색</p>
            </button>            
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
              <DaumPostcodeEmbed style={{maxWidth: "600px"}} onComplete={handleComplete} />
            </Backdrop>
          )}
        <input className="w-full max-h-[50px] px-4 py-[18px] rounded-md;"
            placeholder="상세주소를 입력하세요 (ex. 101호 101호)"
            {...register("addressDetail",{ required: true })}
          />
        </div>
        <InputWithLabel
          label="소속"
          placeholder="ex. 00소속"
          registerType="party"
        />
        <InputWithLabel
          label="직책"
          placeholder="ex. 00직책"
          registerType="position"
        />

        <div style={{ width: "100%", display: "flex", height: "24px" }}>
          <Checkbox
            size="small"
            required={true}
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            color={"success"}
            sx={{
                color: '#0B834B',
            }}
          />
          <p style={{ margin: 0 }}>앱 푸시 알람 수신에 동의합니다</p>
        </div>
        {
          isFailed && <div className="leading-5 bg-neutral-50 px-5 py-1 rounded-lg">
            <p className="text-[13px] text-[#e65f3e]">회원가입에 실패했습니다. 다시 시도해주세요</p>
          </div>
        }
        <button className="w-full flex justify-center items-center max-h-[50px] bg-[#0B834B] px-3 py-[18px] rounded-md" type="submit">
          <p className="text-white text-center text-sm not-italic font-normal leading-[100%] tracking-[0.14px]">제출하기</p>
        </button>
      </form>
  );
};

export default SignUpPage;
