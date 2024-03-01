import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { supabase } from "@/utils/database";
import { Avatar } from "@mui/joy";
import { useState, useRef } from "react";

const UserInfoEditor = ({ user, onCloseModal }: any) => {
  const { register, handleSubmit } = useForm();
  // TODO: replace using env
  const BASE_URL = "https://jjgkztugfylksrcdbaaq.supabase.co/storage/v1/object/public/"
  const profileRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<any>();
  const [profilePreview, setProfilePreview] = useState<any>(BASE_URL + user.profile);

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
    if(user.profile === ""){
      console.log("UPLOAD PROFILE")
      const { data:uploadUserProfile, error:uploadUserProfileError } = await supabase.storage
      .from("USER")
      .upload(user.id, file[0]);
      if(uploadUserProfileError) {
        console.error(uploadUserProfileError)
        throw new Error(uploadUserProfileError.message)
      }
      return (uploadUserProfile as any).fullPath
    }else {
      console.log("UPDATE PROFILE")
      const { data:updateUserProfile, error:updateUserProfileError } = await supabase.storage
      .from("USER")
      .update(user.id, file[0]);
      if(updateUserProfile) {
        return console.error({updateUserProfileError})
      }
      return (updateUserProfile as any).fullPath
    }
  };

  const onSubmit: SubmitHandler<any> = async (updateData: any) => {
    const profilePath = await uploadFile(profile);
    const { data, error } = await supabase
      .from('User')
      .update({ name: updateData.name , position: updateData.position , party: updateData.party , profile : profilePath})
      .eq('id', user.id)
      .select();
    if(error) throw new Error(error.message)
    console.log({updatedUser:data})
    onCloseModal();
  };

  return (
    <Container>
      <MainContent>
        <AvatarContainer>
          <button type="button" onClick={handleOpenFileSelector}>
            <Avatar style={{ width: "84px", height: "84px" }} src={profilePreview}/>
          </button>
          <input ref={profileRef} type="file" accept="image/*" hidden onChange={selectFile}/>
        </AvatarContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div style={{display : "flex", flexDirection: "column", width: "100%", gap: 10}}>
            <FormElement>
              <Label>이름</Label>
              <Input defaultValue={user.name} {...register("name")} />
            </FormElement>
            <FormElement>
              <Label>직책</Label>
              <Input defaultValue={user.position} {...register("position")} />
            </FormElement>
            <FormElement>
              <Label>소속</Label>
              <Input defaultValue={user.party} {...register("party")} />
            </FormElement>
            <Button type="submit">
              <p>저장</p>
            </Button>
          </div>
        </Form>
      </MainContent>
    </Container>
  );
};

export default UserInfoEditor;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 26px 16px 0;
`;

const AvatarContainer = styled.div`
  margin: auto;
`;

const MainContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 60px; /* Adjust as needed */
  padding: 24px;
  border-radius: 8px;
  background: #fff;
`;
const Form = styled.form`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 14px;
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
  border: 1px solid;
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
