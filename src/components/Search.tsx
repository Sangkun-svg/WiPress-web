import styled from "styled-components";

interface Props {}

const SearchModal = () => {
  return (
    <Container>
      <Input placeholder="검색어를 입력해 주세요" />
    </Container>
  );
};

export default SearchModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  width: 100%;
  max-height: 50px;
  border-radius: 6px;
  padding: 18px 16px;
  background-color: #f7f7fa;
`;
