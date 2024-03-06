import { useForm, SubmitHandler } from "react-hook-form";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import NavBar from "@/components/NavBar";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]"
import { useState ,useRef,InputHTMLAttributes} from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label:string; 
  registerType:string;
}

export const getServerSideProps = async (context:any) => { 
  const req = context.req as any;
  const res = context.res as any;
  const session = await getServerSession(req, res, authOptions)
  if((session?.user as any).type === "reporter") {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }    
  }
  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }
  return { 
    props: {
      user_id: (session?.user as any).id
    } 
  } 
}

const RequestPost = (props: any) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const supabase = createClientComponentClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<any>();
  const [images, setImage] = useState<any>();

  const handleOpenFileSelector = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fileRef.current!.click()
  } 

  const handleOpenImageFileSelector = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    imageFileRef.current!.click()
  } 

  const selectFile = async (event: React.ChangeEvent<any>) => {
    setFiles(event.target.files);
  };

  const selectImageFile = async (event: React.ChangeEvent<any>) => {
    setImage(event.target.files);
  };

  const uploadFile = async (file:any, post_id: string) => {
    if (!file) return null;
    if (file.length === 1) {
      const { data, error } = await supabase.storage
        .from("POST")
        .upload(`file/${post_id}/` + uuidv4(), file[0]);
      if (error) throw new Error(error.message);
      return [(data as any).fullPath]
    }
    if (file.length > 1) {
      const result = await Promise.all(
        Object.values(file).map((eachfile:any) => {
          return supabase.storage.from("POST").upload(`file/${post_id}/` + uuidv4(), eachfile);
        }),
      );
      return result.map((el) => (el.data as any).fullPath);
    }
  };

  const uploadImageFile = async (file:any, post_id:string) => {
    if (!file) return null; 
    if (file.length === 1) {
      const { data, error } = await supabase.storage
        .from("POST")
        .upload(`images/${post_id}/` + uuidv4(), file[0]);
      if (error) throw new Error(error.message);
      return [(data as any).fullPath]
    }
    if (file.length > 1) {
      const result = await Promise.all(
        Object.values(file).map((image:any) => {
          return supabase.storage
            .from("POST")
            .upload(`images/${post_id}/` + uuidv4(), image);
        }),
      );
      return result.map((el) => (el.data as any).fullPath)
    }
  };

  const onSubmit: SubmitHandler<any> = async (formData) => {
    try {
      const newPost = await axios.post("/api/post/requestPost", { data: {...formData, user_id: props.user_id, post_type : "registerPost"} });
      if(newPost.status === 200){
        const { data:acceptedPost, error:acceptedPostError } = await supabase.from('AcceptedPost').insert([{ post_id: newPost.data.newPost.id,}]).select();
        console.log({acceptedPost})
        const imagePath = await uploadImageFile(images, newPost.data.newPost.id);
        const filePath = await uploadFile(files, newPost.data.newPost.id);
        const { data, error } = await supabase
        .from('Post')
        .update({ image: imagePath ,file: filePath})
        .eq('id', newPost.data.newPost.id)
        .select();
        if(error) throw new Error(error.message)
        return router.push("/registerPost")
      }
    } catch (error) {
      console.error(error)      
    }
  };



  const InputWithLabel = ({label,registerType,...rest}:InputProps) => {
    return (
      <div className='flex flex-col w-full gap-2.5'>
        <label className='text-[15px] not-italic font-medium leading-[100%]'>{label}</label>
        <input className='w-full max-h-[50px] px-4 py-[18px] rounded-md' {...rest}/>
      </div>
    )
  }


  return (
    <div className="w-full max-w-[600px] bg-[#F0F6F4] mx-auto my-0">
      <NavBar title={"보도자료 작성"} />
      <form className="flex justify-center items-center flex-col gap-[30px] pt-[18px] pb-0 px-4" onSubmit={handleSubmit(onSubmit)}>
        <InputWithLabel
          label="제목"
          placeholder="ex. 제목 예시"
          registerType="title"
        />
        <InputWithLabel
          label="부제목"
          placeholder="ex. 부제목 예시"
          registerType="title"
        />
        <div className='flex flex-col w-full gap-2.5'>
          <label className='text-[15px] not-italic font-medium leading-[100%]'>내용</label>
          <textarea 
            className='w-full min-h-[164px] bg-white px-4 py-3 rounded-md' 
            maxLength={300}
            placeholder="ex. 내용 한두줄 예시"
            {...register("content", { required: true })}
          />
          <p className="text-[#636366] text-sm not-italic font-normal leading-[100%] tracking-[0.14px] mt-3">300자 이하</p>
        </div>

        {/* File */}
        <div className="div className='flex flex-col w-full gap-2.5'">
          <div className="flex items-center">
          <button className="flex w-[130px] justify-center items-center gap-2 shrink-0 self-stretch bg-[white] px-4 py-2 rounded-md" type="button" onClick={handleOpenFileSelector} style={{marginRight: "14px"}}>
            <InsertLinkOutlinedIcon style={{ color: "#0B834B" }}/>
            <p className="text-[#303030] text-sm not-italic font-normal leading-[100%] tracking-[0.14px] whitespace-nowrap m-0">파일 업로드</p>
          </button>
          <input ref={fileRef} type="file" multiple hidden onChange={selectFile} />
            <div className="flex items-center">
              {files && Object.values(files).map((file:any,idx:number) => {
                return <p key={idx} className="max-w-[100px] text-ellipsis overflow-hidden whitespace-nowrap">{file.name}</p>
              })}
            </div>
          </div>
        </div>
        {/* Image */}
        <div className="div className='flex flex-col w-full gap-2.5'">
        <div style={{display: "flex" , alignItems: "center"}}>
          <button className="flex w-[130px] justify-center items-center gap-2 shrink-0 self-stretch bg-[white] px-4 py-2 rounded-md" type="button" onClick={handleOpenImageFileSelector} style={{marginRight: "14px"}}>
            <PhotoSizeSelectActualOutlinedIcon style={{ color: "#0B834B" }}/>
            <p className="text-[#303030] text-sm not-italic font-normal leading-[100%] tracking-[0.14px] whitespace-nowrap m-0">사진 업로드</p>
          </button>
          <input ref={imageFileRef} type="file" multiple hidden accept="image/*" onChange={selectImageFile} />
            <div className="flex items-center">
              {images && Object.values(images).map((image:any,idx:number) => {
                return <p key={idx} style={{maxWidth : "100px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>{image.name}</p>
              })}
            </div>
          </div>
        </div>
        <button className="w-full bg-[#0B834B] px-0 py-[18px] rounded-md" type="submit">
          <p className="text-white text-center text-[15px] not-italic font-medium leading-[100%] tracking-[0.15px]">업로드 하기</p>
        </button>
      </form>
    </div>
  );
};

export default RequestPost;