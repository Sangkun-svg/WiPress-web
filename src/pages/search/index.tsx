import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { NavBar } from "@/components";
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

    return <div className='w-full max-w-[600px] bg-[#F0F6F4] mx-auto my-0 h-screen'>
      <NavBar title={"검색"} />
      <div className='flex flex-col mx-auto my-0 pt-2 pb-0 px-4'>
        <div className='flex mb-[18px]' >
          <input className='w-full max-h-[50px] px-4 py-[18px] rounded-md' value={keyword} onChange={handleKeyword} placeholder='검색어를 입력해 주세요'/>
          <IconButton onClick={handleMoveToResult}>
            <SearchIcon style={{ color: '#0B834B' }} />
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

      <div className='w-full mt-6'>
        <p className='text-base not-italic font-medium leading-[100%] mb-3.5'>날짜 필터링</p>
        <div className='w-full h-[53px] flex items-center justify-between mx-0 my-auto bg-white pl-[20px] pr-2.5 rounded-t-md'>
          <p className='text-center text-base not-italic font-normal leading-[100%]'>시작</p>
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
                background: "#F9F9FA",
                border: "none"
              }
            }
           }}/>
        </div>
        <Divider />
        <div className='w-full h-[53px] flex items-center justify-between mx-0 my-auto bg-white pl-[20px] pr-2.5 rounded-bl-md'>
          <p className='text-center text-base not-italic font-normal leading-[100%]'>종료</p>
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
                background: "#F9F9FA",
                border: "none"
              }
            }
           }}/>
        </div>
      </div>
      </div>
    </div>
};

export default Search;

const CustomSelect = styled(Select)`
  max-width: 134px;
  padding: 6px 10px;
  background-color: #fff;
  .MuiSelect-select {
    padding: 0;
  }
  .MuiInputBase-input{
    color: #0B834B;
  }
`
