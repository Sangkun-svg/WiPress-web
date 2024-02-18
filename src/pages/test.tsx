import DropdownMenu from "@/components/DropdownMenu";
import styled from "styled-components";
import Divider from "@mui/material/Divider";

interface Props {}

const SearchModal = () => {
  return (
    <Container>
      <SearchForm>
        <Input placeholder="검색어를 입력해 주세요" />
        <DropdownMenu />
        <DateFilterTitle>날짜 필터링</DateFilterTitle>
        <div>
          <p>시작</p>
          <Divider />
          <p>종료</p>
        </div>
      </SearchForm>
    </Container>
  );
};

export default SearchModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;

const SearchForm = styled.form`
  margin-top: 8px;
`;

const Input = styled.input`
  width: 100%;
  max-height: 50px;
  border-radius: 6px;
  padding: 18px 16px;
  background-color: #f7f7fa;
`;

const DateFilterTitle = styled.p`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 16px */
`;
