import styled from "styled-components";
import { useRef } from "react";
import ModalWrapper from "../components/Modal/Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { supabase } from "@/utils/database";

const UserInfoEditor = ({ user }: any) => {
  const modalRef = useRef(null);
  const handleOpenModal = () => {
    (modalRef.current as any).showModal();
  };
  const handleCloseModal = () => {
    (modalRef.current as any).close();
  };
  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<any> = async (updateData: any) => {
    const { data, error } = await supabase
    .from('User')
    .update({ name: updateData.name , position: updateData.position , party: updateData.party})
    .eq('id', user.id)
    .select();
    if(error) throw new Error(error.message)
    console.log(data)
    handleCloseModal();
  };
  return (
    <Container>
      <button onClick={handleOpenModal}>open modal</button>
      <ModalWrapper ref={modalRef}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormElement>
            <Label>이름</Label>
            <Input {...register("name")} />
          </FormElement>
          <FormElement>
            <Label>직책</Label>
            <Input placeholder="ex. 00직책" {...register("position")} />
          </FormElement>
          <FormElement>
            <Label>소속</Label>
            <Input placeholder="ex. 00소속" {...register("party")} />
          </FormElement>
          <Button type="submit">
            <p>저장</p>
          </Button>
        </Form>
      </ModalWrapper>
    </Container>
  );
};

export default UserInfoEditor;

const Container = styled.div``;
const Form = styled.form`
  width: 100%;
  margin-top: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
