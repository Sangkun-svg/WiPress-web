import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import NavBar from "@/components/NavBar";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Divider,Select,MenuItem,IconButton } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const Search = () => {
    const router = useRouter();
    const filterType = ["orderOfPicks","recentDates","orderOfLikes","myPicks"] as const
    const [type, setType] = useState<typeof filterType[number]>("orderOfPicks");
    const [keyword, setKeyword] = useState<string>("");
    const [startDate , setStartDate] = useState<string>("");
    const [endDate , setEndDate] = useState<string>("");
    const handleMoveToResult = () => router.push(`search/${type}/${startDate}/${endDate}/${keyword}`)
    const handleKeyword = (event: ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
    };
    const handleChange = (event: any) => {
      setType(event.target.value);
    };
    const handleStartDate = (date: any) => {
      const startDate = dayjs(date).toISOString();
      setStartDate(startDate);
    };
    const handleEndDate = (date: any) => {
      const endDate = dayjs(date).toISOString();
      setEndDate(endDate);
    };

    return <Container>
      <NavBar title={"검색"} />
      <FilterBox>
        <div style={{display: "flex", marginBottom: "18px"}}>
          <Input value={keyword} onChange={handleKeyword} placeholder='검색어를 입력해 주세요'/>
          <IconButton onClick={handleMoveToResult}>
            <SearchIcon />
          </IconButton>
        </div>
        <CustomSelect
          value={type}
          onChange={handleChange}
        >
          <MenuItem divider value={"orderOfPicks"}>Pick 많은 순</MenuItem>
          <MenuItem divider value={"recentDates"}>최근 날짜 순</MenuItem>
          <MenuItem divider value={"orderOfLikes"}>좋아요 순</MenuItem>
          <MenuItem value={"myPicks"}>나의 Pick</MenuItem>
        </CustomSelect>
      <DatePickerContainer>
        <DatePickerTypo>날짜 필터링</DatePickerTypo>
        <DatePickerItem>
          <Typo>시작</Typo>
          <MobileDatePicker 
           onChange={handleStartDate}
           format={"YYYY.MM.DD"}
           sx={{ 
            "& .MuiInputBase-root": {
              padding: 0,
              "& .MuiButtonBase-root": {
                padding: 0,
              },
              "& .MuiInputBase-input": {
                width: "124px",
                padding: "10px 22px",
              }
            }
           }}/>
        </DatePickerItem>
        <Divider />
        <DatePickerItem>
          <Typo>종료</Typo>
          <MobileDatePicker 
           onChange={handleEndDate}
           format={"YYYY.MM.DD"}
           sx={{ 
            "& .MuiInputBase-root": {
              padding: 0,
              "& .MuiButtonBase-root": {
                padding: 0,
              },
              "& .MuiInputBase-input": {
                width: "124px",
                padding: "10px 22px",
              }
            }
           }}/>
        </DatePickerItem>
      </DatePickerContainer>
      </FilterBox>
    </Container>
};

export default Search;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;
const FilterBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 8px 16px 0;
`;
const CustomSelect = styled(Select)`
  max-width: 134px;
  padding: 6px 10px;
  .MuiSelect-select {
    padding: 0;
  }
`
const DatePickerContainer = styled.div`
  margin-top: 24px;
  width: 100%;
`

const DatePickerItem = styled.div`
  width: 100%;
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto 0;
`;

const DatePickerTypo = styled.p`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  margin-bottom: 14px;
`;

const Typo = styled.p`
  color: #000;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

const Input = styled.input`
  width: 100%;
  max-height: 50px;
  border-radius: 6px;
  padding: 18px 16px;
  background-color: #f7f7fa;
`;
