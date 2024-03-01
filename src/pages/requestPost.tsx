import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import NavBar from "@/components/NavBar";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]"
import { useState ,useRef} from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";

export const getServerSideProps = async (context:any) => { 
  const req = context.req as any;
  const res = context.res as any;
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
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

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      const newPost = await axios.post("/api/post/requestPost", { data: {...data, user_id: props.user_id, post_type : "registerPost"} });
      if(newPost.status === 200){
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

  return (
    <Container>
      <NavBar title={"보도자료 작성"} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormElement>
          <Label>제목</Label>
          <Input
            placeholder="ex. 제목 예시"
            {...register("title", { required: true })}
          />
        </FormElement>
        <FormElement>
          <Label>부제목</Label>
          <Input
            placeholder="ex. 부제목 예시"
            {...register("subtitle", { required: true })}
          />
        </FormElement>
        <FormElement>
          <Label>내용</Label>
          <TextArea
            maxLength={300}
            placeholder="ex. 내용 한두줄 예시"
            {...register("content", { required: true })}
          />
          <LimitText>300자 이하</LimitText>
        </FormElement>
        {/* File */}
        <FormElement>
          <div style={{display: "flex" , alignItems: "center"}}>
          <FileButton type="button" onClick={handleOpenFileSelector} style={{marginRight: "14px"}}>
            <InsertLinkOutlinedIcon />
            <p>파일 업로드</p>
          </FileButton>
          <input
            ref={fileRef}
            type="file"
            multiple
            hidden
            onChange={selectFile}
          />
          <div style={{display: "flex", gap : 10}}>
            {files && Object.values(files).map((file:any,idx:number) => {
              return <p key={idx} style={{maxWidth : "100px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>{file.name}</p>
            })}
          </div>
          </div>
        </FormElement>
        {/* Image */}
        <FormElement>
        <div style={{display: "flex" , alignItems: "center"}}>
          <FileButton type="button" onClick={handleOpenImageFileSelector} style={{marginRight: "14px"}}>
            <PhotoSizeSelectActualOutlinedIcon />
            <p>사진 업로드</p>
          </FileButton>
          <input
            ref={imageFileRef}
            type="file"
            multiple
            hidden
            accept="image/*"
            onChange={selectImageFile}
          />
          <div style={{display: "flex", gap : 10}}>
            {images && Object.values(images).map((image:any,idx:number) => {
              return <p key={idx} style={{maxWidth : "100px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>{image.name}</p>
            })}
          </div>
          </div>
        </FormElement>
        <SubmitButton>
          <p>업로드 하기</p>
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default RequestPost;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 16px;
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

const TextArea = styled.textarea`
  width: 100%;
  min-height: 164px;
  border-radius: 6px;
  padding: 12px 16px;
  background-color: #f7f7fa;
`;

const LimitText = styled.p`
  margin-top: 12px;
  color: #636366;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 14px */
  letter-spacing: 0.14px;
`;

const FileButton = styled.button`
  display: flex;
  width: 129px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 6px;
  background: #f7f7fa;
  p {
    color: #303030;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    letter-spacing: 0.14px;
    margin: 0;
    white-space: nowrap;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 18px 0;
  border-radius: 6px;
  background: #000;
  p {
    color: #fff;
    text-align: center;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    letter-spacing: 0.15px;
  }
`;
