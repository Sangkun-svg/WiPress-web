import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styled from "styled-components";
import { COLOR } from "@/constants/color";
import DaumPostcodeEmbed from "react-daum-postcode";
import { Backdrop } from "@mui/material";

// interface IFormInput {
//   name: string;
//   phoneNumber: number; // zod
//   birth: number;
//   address?: {
//     // ??
//     postNumber: string;
//     detailAdress: string;
//   };
//   party: string; // 소속
//   position: string; // 직책
// }

const SignUpPage = () => {
  const searchParams = useSearchParams();
  const signUpType = searchParams.get("type");
  const { register, handleSubmit } = useForm();
  const [address, setAddress] = useState<string>("");
  const [openPostModal, setOpenPostModal] = useState<boolean>(false);
  const handleModal = () => setOpenPostModal((prev: boolean) => !prev);
  const onSubmit: SubmitHandler<any> = (data) => {
    // signUpType
    console.log(data);
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
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormElement>
        <Label>이름</Label>
        <Input
          placeholder="ex. 홍길동"
          {...register("name", { required: true })}
        />
      </FormElement>
      <FormElement>
        <Label>휴대폰 번호</Label>
        <Input
          type="number"
          maxLength={11}
          placeholder="ex. 010-0000-0000"
          {...register("phoneNumber", { required: true })}
        />
      </FormElement>
      <FormElement>
        <Label>생년월일</Label>
        <Input
          type="number"
          maxLength={8}
          placeholder="ex. 1990-03-10"
          {...register("birth", { required: true })}
        />
      </FormElement>
      <FormElement>
        <Label>주소</Label>
        <div style={{ display: "flex", gap: 10 }}>
          <Input
            value={address}
            style={{ width: "75%" }}
            placeholder="우편번호를 검색하세요"
            {...register("address")}
          />
          <Button style={{ width: "25%" }} onClick={handleModal}>
            <p>우편번호 검색</p>
          </Button>
        </div>
        {/* TODO: get Code about Modal from GrowingPeeple and apply    */}
        {/* TODO: using BackDrop from MUI */}
        {/* {openPostModal && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <DaumPostcodeEmbed onComplete={handleComplete} />
          </Backdrop>
        )} */}
        <Input
          placeholder="상세주소를 입력하세요 (ex. 101호 101호)"
          {...register("addressDetail", { required: true })}
        />
      </FormElement>
      <FormElement>
        <Label>소속</Label>
        <Input
          placeholder="ex. 00소속"
          {...register("party", { required: true })}
        />
      </FormElement>
      <FormElement>
        <Label>직책</Label>
        <Input
          placeholder="ex. 00직책"
          {...register("position", { required: true })}
        />
      </FormElement>
      {/* TODO: Change Submit Button design */}
      {/* TODO: Add PushAlarm Checkbox  */}
      <button type="submit">제출하기</button>
    </Form>
  );
};

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
  background-color: ${COLOR.BG};
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
