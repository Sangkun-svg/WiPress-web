import { NavBar } from "@/components";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

const SignUpType = ["requester", "reporter"] as const;

const SignUpTypePage = () => {
  const router = useRouter();
  const moveToSignUp = (type: (typeof SignUpType)[number]) =>
    router.push("/signup?type=" + type);

  return (
    <div className="h-dvh bg-[#F0F6F4]">
      <NavBar/>
      <Image style={{marginTop: "108px"}} alt="welcome" src={"/wipressWC.webp"} width={390} height={81} />
      <div className='w-full max-w-[600px] flex justify-center items-center flex-col mx-auto my-0 px-4 py-0'>
        <div className="w-full mt-[24px] mb-[32px]">
          <p className="text-lg not-italic font-normal leading-[170%]">회원가입 종류를 선택해주세요 :)</p>
        </div>
        <div className="flex flex-col w-full gap-[15px]">
          <button className="w-[calc(100%_-_1px)] border flex justify-center items-center max-h-[50px] bg-[#0B834B] px-3 py-[18px] rounded-md gap-[14px]" onClick={() => moveToSignUp("requester")}>
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4.5" width="15" height="15" rx="4" fill="white"/>
              <path d="M12 17.8096C12.2128 17.8096 12.391 17.7378 12.5346 17.5942C12.6782 17.4506 12.75 17.2724 12.75 17.0596V13.3596L14.0731 14.6827C14.2115 14.8211 14.3856 14.892 14.5952 14.8952C14.8048 14.8984 14.982 14.8275 15.1269 14.6827C15.2718 14.5378 15.3442 14.3622 15.3442 14.1558C15.3442 13.9493 15.2718 13.7737 15.1269 13.6288L12.6327 11.15C12.4519 10.9692 12.241 10.8789 12 10.8789C11.759 10.8789 11.5481 10.9692 11.3673 11.15L8.87308 13.6288C8.73461 13.7673 8.66378 13.9413 8.66058 14.1509C8.65736 14.3605 8.72819 14.5378 8.87308 14.6827C9.01794 14.8275 9.19358 14.9 9.39998 14.9C9.60638 14.9 9.78201 14.8275 9.92688 14.6827L11.25 13.3596V17.0596C11.25 17.2724 11.3218 17.4506 11.4654 17.5942C11.609 17.7378 11.7872 17.8096 12 17.8096ZM5.38463 21C4.88591 21 4.44712 20.8105 4.06827 20.4317C3.68942 20.0528 3.5 19.614 3.5 19.1153V7.50578C3.5 7.29168 3.5343 7.08751 3.6029 6.89328C3.67148 6.69906 3.77437 6.5199 3.91155 6.3558L5.3154 4.6577C5.4795 4.4436 5.68462 4.28046 5.93077 4.16828C6.17692 4.05609 6.43718 4 6.71155 4H17.2692C17.5435 4 17.8054 4.05609 18.0547 4.16828C18.3041 4.28046 18.5108 4.4436 18.6749 4.6577L20.0884 6.37503C20.2256 6.53913 20.3285 6.71989 20.3971 6.91733C20.4657 7.11476 20.5 7.32053 20.5 7.53463V19.1153C20.5 19.614 20.3105 20.0528 19.9317 20.4317C19.5528 20.8105 19.114 21 18.6153 21H5.38463ZM5.39035 6.90385H18.6L17.5096 5.60575C17.4775 5.5737 17.4407 5.54806 17.399 5.52883C17.3573 5.50959 17.314 5.49998 17.2692 5.49998H6.72117C6.67629 5.49998 6.63302 5.50959 6.59135 5.52883C6.54968 5.54806 6.51282 5.5737 6.48075 5.60575L5.39035 6.90385Z" fill="black"/>
            </svg>
            <p className="text-white text-center text-sm not-italic font-normal leading-[100%] tracking-[0.14px]">보도요청용 회원가입</p>
          </button>
          <button className="w-[calc(100%_-_1px)] border flex justify-center items-center max-h-[50px] bg-[#0B834B] px-3 py-[18px] rounded-md gap-[14px]" onClick={() => moveToSignUp("reporter")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <rect x="3" y="4.5" width="18" height="17" rx="2" fill="black"/>
              <path d="M12 14.7329C11.5126 14.7329 11.1001 14.5738 10.7625 14.2555C10.4248 13.9373 10.256 13.5485 10.256 13.089V9.14382C10.256 8.6844 10.4248 8.29558 10.7625 7.97734C11.1001 7.65911 11.5126 7.5 12 7.5C12.4874 7.5 12.8999 7.65911 13.2375 7.97734C13.5752 8.29558 13.744 8.6844 13.744 9.14382V13.089C13.744 13.5485 13.5752 13.9373 13.2375 14.2555C12.8999 14.5738 12.4874 14.7329 12 14.7329ZM11.4768 19.0069V17.3326C10.4385 17.2197 9.54861 16.8176 8.8072 16.1263C8.06578 15.4351 7.63158 14.5925 7.50458 13.5986C7.48581 13.4587 7.52471 13.3388 7.62129 13.2389C7.71788 13.139 7.84041 13.089 7.98887 13.089C8.13733 13.089 8.26164 13.1373 8.3618 13.2338C8.46196 13.3303 8.52859 13.4486 8.56168 13.5885C8.68868 14.3936 9.07928 15.0595 9.73349 15.5864C10.3877 16.1133 11.1432 16.3767 12 16.3767C12.8684 16.3767 13.6268 16.1105 14.2752 15.5782C14.9236 15.0458 15.3113 14.3826 15.4383 13.5885C15.4714 13.4486 15.538 13.3303 15.6382 13.2338C15.7384 13.1373 15.8627 13.089 16.0111 13.089C16.1596 13.089 16.2821 13.139 16.3787 13.2389C16.4753 13.3388 16.5142 13.4587 16.4954 13.5986C16.3684 14.5706 15.9371 15.4066 15.2015 16.1067C14.4659 16.8068 13.5731 17.2155 12.5232 17.3326V19.0069C12.5232 19.1468 12.4731 19.264 12.3729 19.3584C12.2728 19.4528 12.1485 19.5 12 19.5C11.8515 19.5 11.7272 19.4528 11.6271 19.3584C11.5269 19.264 11.4768 19.1468 11.4768 19.0069Z" fill="white"/>
            </svg>
            <p className="text-white text-center text-sm not-italic font-normal leading-[100%] tracking-[0.14px]">기자용 회원가입</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpTypePage;
 
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
  background-color: #0B834B;
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
