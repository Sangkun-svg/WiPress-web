import styled from "styled-components";
import { Avatar } from "@mui/joy";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BottomNav from "@/components/BottomNav";
import { useRouter } from "next/router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { signOut } from "next-auth/react";
import { getServerSession } from "next-auth";
import { supabase } from "@/utils/database";
import { useRef } from "react";
import { authOptions } from "../api/auth/[...nextauth]";

export const getServerSideProps = async (context:any) => {
  const req = context.req as any;
  const res = context.res as any;
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }
  const { data: User, error } = await supabase
      .from('User')
      .select()
      .eq("id", (session?.user as any).id);
        
  return {props : {
    user: User![0],
    isAuthenticated : !!session
  }}
}

const MyPage = ({user}: any) => {
  const router = useRouter();
  const modalRef = useRef(null);
  const BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL!

  const handleMove = (path: string) => router.push(path);
  const handleSignOut = async () => signOut({ callbackUrl: `/` })
  const handleDeleteUser = async () => {
    const { error } = await supabase
    .from('User')
    .delete()
    .eq('id', user.id);
    if(error) throw new Error("delete user error")
    router.push("/")
  }

  return (
    <div className="flex items-center flex-col min-h-screen pt-[26px] pb-0 px-4">
      <div className="w-full max-w-[600px] mb-[60px] mx-auto my-0">
      <p className="text-[19px] not-italic font-semibold leading-[100%]">마이페이지</p>
      <div className="flex justify-between mt-[26px] mb-3.5 mx-0">
        <div className="flex">
          <Avatar style={{ width: "84px", height: "84px" }} src={user.profile ? BASE_URL + user.profile : ""}/>
          <div className="flex flex-col justify-center gap-1.5 ml-3">
            <p className="text-lg not-italic font-medium leading-[100%]">{user.name}</p>
            <p className="text-[#4a4a4a] text-[15px] not-italic font-normal leading-[100%]">{user.party}기자</p>
            <p className="text-[#4a4a4a] text-[15px] not-italic font-normal leading-[100%]">{user.position}소속</p>
          </div>
        </div>
        <button 
          className="flex justify-center items-center max-h-[34px] bg-[#f7f7fa] gap-1 px-3.5 py-1.5 rounded-md" 
          onClick={() => handleMove("/my/update")}
        >
          <EditOutlinedIcon style={{color : "#0B834B"}} />
          <p className="text-[#4a4a4a] text-center text-[15px] not-italic font-normal leading-[100%] tracking-[0.14px]">편집</p>
        </button>
      </div>
      <div className="flex flex-col gap-[5px]">
        <div className="cursor-pointer flex items-center justify-between w-full max-h-16 px-1.5 py-6" onClick={() => handleMove("/myPicks")}>
          <p className="text-[#222] text-[15px] not-italic font-normal leading-[100%] tracking-[0.15px]">나의 Pick 모아보기</p>
          <ArrowForwardIosIcon style={{ color: "#D4D4D4" }} />
        </div>
        <div className="cursor-pointer flex items-center justify-between w-full max-h-16 px-1.5 py-6 last:border-b-0" onClick={handleSignOut}>
          <p className="text-[#222] text-[15px] not-italic font-normal leading-[100%] tracking-[0.15px]">로그아웃</p>
          <ArrowForwardIosIcon style={{ color: "#D4D4D4" }} />
        </div>
        <div className="cursor-pointer flex items-center justify-between w-full max-h-16 px-1.5 py-6 last:border-b-0" onClick={handleDeleteUser}>
          <p className="text-[#222] text-[15px] not-italic font-normal leading-[100%] tracking-[0.15px]">계정삭제</p>
          <ArrowForwardIosIcon style={{ color: "#D4D4D4" }} />
        </div>
        <div className="cursor-pointer flex items-center justify-between w-full max-h-16 px-1.5 py-6 last:border-b-0" onClick={() => handleMove("/police/personal")}>
          <p className="text-[#222] text-[15px] not-italic font-normal leading-[100%] tracking-[0.15px]">개인정보처리방침</p>
          <ArrowForwardIosIcon style={{ color: "#D4D4D4" }} />
        </div>
      </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default MyPage;

const Item = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-height: 64px;
  padding: 24px 6px;
  &:not(:last-child) {
    border-bottom: 1px solid #e5e5ea;
  }
`;