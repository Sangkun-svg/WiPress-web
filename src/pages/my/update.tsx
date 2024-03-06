import { useForm, SubmitHandler } from "react-hook-form";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { supabase } from "@/utils/database";
import { NavBar } from '@/components';
import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { Avatar, Checkbox } from "@mui/material";
import { useRouter } from "next/navigation";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label:string; 
  registerType:string;
}

export const getServerSideProps = async (context:any) => { 
    const req = context.req as any;
    const res = context.res as any;
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        }
    }

    const { data: user, error } = await supabase
        .from("User")
        .select("*")
        .eq("id", (session.user as any).id);
    
    return { props: {
        user : user![0]
    } } 
}

const UpdateUser = ({ user }:any) => {
    const router = useRouter();
    const BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL!
    const { register, handleSubmit } = useForm();
    const [checked, setChecked] = useState(user.agreePushAlarm);
    const profileRef = useRef<HTMLInputElement>(null);
    const [profile, setProfile] = useState<any>();
    const [profilePreview, setProfilePreview] = useState<any>(user.profile ? BASE_URL + user.profile : "");
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    }
    const handleOpenFileSelector = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      profileRef.current!.click();
    };
    const selectFile = async (event: React.ChangeEvent<any>) => {
      setProfile(event.target.files);
      encodeFileToBase64(event.target.files[0])
    };
    const encodeFileToBase64 = (fileBlob:any) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      return new Promise((resolve) => {
        reader.onload = () => {
          setProfilePreview(reader.result);
        };
      });
    };
    const uploadFile = async (file:any) => {
      if (!file) return null;
      if(!user.profile){
        const { data:uploadUserProfile, error:uploadUserProfileError } = await supabase.storage
        .from("USER")
        .upload(user.id, file[0])
        if(uploadUserProfileError) {
          console.error(uploadUserProfileError.message)
          throw new Error(uploadUserProfileError.message)
        }
        return (uploadUserProfile as any).fullPath
      }else {
        const { data:updateUserProfile, error:updateUserProfileError } = await supabase.storage
        .from("USER")
        .update( user.profile,file[0]);
        if(updateUserProfileError) {
          return console.error(updateUserProfileError)
        }
        return (updateUserProfile as any).fullPath
      }
    };

    const onSubmit: SubmitHandler<any> = async (data) => {
      
      const profilePath = await uploadFile(profile);
      const { data:updatedUser, error } = await supabase
      .from('User')
      .update({ 
          phoneNumber: data.phoneNumber,
          name: data.name,
          birth: data.birth,
          party: data.party,
          position: data.position,
          agreePushAlarm: data.agreePushAlarm,
          profile : profilePath
        })
      .eq('id', user.id)
      .select();
      if(error) throw new Error(error.message);
      router.push("/my")
    }
  
    const InputWithLabel = ({label,registerType,...rest}:InputProps) => {
      return (
        <div className='flex flex-col w-full gap-2.5'>
          <label className='text-[15px] not-italic font-medium leading-[100%]'>{label}</label>
          <input className='w-full max-h-[50px] px-4 py-[18px] rounded-md' {...rest} {...register(registerType, { required: true })}/>
        </div>
      )
    }

    return <div className="h-screen max-w-[600px] mx-auto my-0 bg-[#F0F6F4]">
        <NavBar title={"정보 수정"}/>
        <form className="flex justify-center items-center flex-col gap-[30px] pt-[18px] pb-3 px-4" onSubmit={handleSubmit(onSubmit)}>
          <button type="button" onClick={handleOpenFileSelector}>
            <Avatar style={{ width: "84px", height: "84px" }} src={profilePreview}/>
          </button>
          <input ref={profileRef} type="file" hidden accept="image/*" onChange={selectFile} />
          <InputWithLabel
            label="휴대폰 번호"
            maxLength={11}
            placeholder="ex. 010-0000-0000"
            registerType="phoneNumber"
            defaultValue={user.phoneNumber}
            onKeyPress={(event:any) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}            
          />
          <InputWithLabel
            label="이름"
            placeholder="ex. 홍길동"
            registerType="name"
            defaultValue={user.name}
          />
          <InputWithLabel
            label="생년월일"
            defaultValue={user.birth}
            placeholder="ex. 1990-03-10"
            registerType="birth"
          />
          <InputWithLabel
            label="소속"
            placeholder="ex. 00소속"
            registerType="party"
            defaultValue={user.party}
          />
          <InputWithLabel
            label="직책"
            placeholder="ex. 00직책"
            registerType="position"
            defaultValue={user.position}
          />
        <div className="flex w-full h-6">
          <Checkbox
            size="small"
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            color={"success"}
            sx={{
                color: '#0B834B',
            }}
          />
          <p className="m-0">앱 푸시 알람 수신에 동의합니다</p>
        </div>
        <button className="w-full flex justify-center items-center max-h-[50px] bg-[#0B834B] px-3 py-[18px] rounded-md" type="submit">
         <p className="text-white text-center text-sm not-italic font-normal leading-[100%] tracking-[0.14px]">수정하기</p>
        </button>
      </form>
    </div>
};

export default UpdateUser;
