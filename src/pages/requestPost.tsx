import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";

interface Props {}

const RequestPost = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormElement>
          <Label>제목</Label>
          <Input
            placeholder="ex. 제목 예시"
            {...register("name", { required: true })}
          />
        </FormElement>
        <FormElement>
          <Label>부제목</Label>
          <Input
            placeholder="ex. 부제목 예시"
            {...register("phoneNumber", { required: true })}
          />
        </FormElement>
        <FormElement>
          <Label>내용</Label>
          <TextArea
            maxLength={300}
            placeholder="ex. 내용 한두줄 예시"
            {...register("birth", { required: true })}
          />
          <LimitText>300자 이하</LimitText>
        </FormElement>
        <FormElement>
          <FileButton>
            <InsertLinkOutlinedIcon />
            <p>파일 업로드</p>
          </FileButton>
          <input
            {...register("file")}
            id="file"
            type="file"
            className="hidden"
          />
        </FormElement>
        <FormElement>
          <FileButton>
            <PhotoSizeSelectActualOutlinedIcon />
            <p>사진 업로드</p>
          </FileButton>
          <input
            {...register("image")}
            id="picture"
            type="file"
            className="hidden"
            accept="image/*"
          />
        </FormElement>
        <SubmitButton>
          <p>업로드 하기</p>
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default RequestPost;

const Container = styled.div``;
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
