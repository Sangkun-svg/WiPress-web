import { useForm, SubmitHandler } from "react-hook-form";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { supabase } from "@/utils/database";
import NavBar from '@/components/NavBar';
import styled from 'styled-components';
import { useState } from "react";
import { Backdrop, Checkbox } from "@mui/material";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useRouter } from "next/navigation";

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
    const { register, handleSubmit } = useForm();
    const [checked, setChecked] = useState(user.agreePushAlarm);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };
      const onSubmit: SubmitHandler<any> = async (data) => {
        const { data:updatedUser, error } = await supabase
        .from('User')
        .update({ 
            phoneNumber: data.phoneNumber,
            name: data.name,
            birth: data.birth,
            party: data.party,
            position: data.position,
            agreePushAlarm: data.agreePushAlarm,
         })
        .eq('id', user.id)
        .select();
        if(error) throw new Error(error.message);
        router.push("/my")
    }

    return <Container>
        <NavBar title={"정보 수정"}/>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <FormElement>
          {/* 번호 중복 확인 추가 */}
          <Label>휴대폰 번호</Label>
          <Input
            defaultValue={user.phoneNumber}
            placeholder="ex. 010-0000-0000"
            {...register("phoneNumber")}
          />
        </FormElement>
        <FormElement>
          <Label>이름</Label>
          <Input defaultValue={user.name} placeholder="ex. 홍길동" {...register("name")} />
        </FormElement>
        <FormElement>
          {/* TODO: Input form 변경, library 사용 추천 */}
          <Label>생년월일</Label>
          <Input
            defaultValue={user.birth}
            placeholder="ex. 1990-03-10"
            {...register("birth")}
          />
        </FormElement>
        <FormElement>
          <Label>소속</Label>
          <Input defaultValue={user.party} placeholder="ex. 00소속" {...register("party")} />
        </FormElement>
        <FormElement>
          <Label>직책</Label>
          <Input defaultValue={user.position} placeholder="ex. 00직책" {...register("position")} />
        </FormElement>
        <div style={{ width: "100%", display: "flex", height: "24px" }}>
          <Checkbox
            size="small"
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <p style={{ margin: 0 }}>앱 푸시 알람 수신에 동의합니다</p>
        </div>
        <Button type="submit">
          <p>수정하기</p>
        </Button>
      </Form>

    </Container>
};

export default UpdateUser;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;
const Form = styled.form`
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
