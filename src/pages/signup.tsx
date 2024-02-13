import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  name: string;
  phoneNumber: number; // zod
  birth: number;
  address?: {
    // ??
    postNumber: string;
    detailAdress: string;
  };
  party: string; // 소속
  position: string; // 직책
}

export default function SignUpPage() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form
      className="flex justify-center items-center flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>이름</label>
      <input {...register("name")} />
      <label>휴대폰 번호</label>
      <input {...register("phoneNumber")} />
      <label>생년월일</label>
      <input {...register("birth")} />
      {/* <label>주소</label>
      <input {...register("name")} /> */}
      <label>소속</label>
      <input {...register("party")} />
      <label>직책</label>
      <input {...register("position")} />
      <button type="submit" />
    </form>
  );
}
