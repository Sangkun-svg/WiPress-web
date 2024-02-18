import styled from "styled-components";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useState } from "react";
import { styled as muiStyled } from "@mui/material/styles";
import { COLOR } from "@/constants/color";
import { useRouter } from "next/router";

const BottomNav = () => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const handleMoveBoard = () => router.push("/");
  const handleMoveRequestPost = () => router.push("/requestPost");
  const handleMoveMy = () => router.push("/my");

  const CustomBottomNavigationAction = muiStyled(BottomNavigationAction)`
    .MuiBottomNavigationAction-label {
      font-size: 0.75rem;
    }
    .Mui-selected {
      color: ${COLOR.Gray800};
    }
  `;

  return (
    <CustomBottomNavigation
      showLabels
      value={value}
      onChange={(event: any, newValue: number) => {
        setValue(newValue);
      }}
    >
      <CustomBottomNavigationAction
        label="게시판"
        onClick={handleMoveBoard}
        icon={
          <GridViewRoundedIcon
            style={{ color: value === 0 ? "#000" : COLOR.Gray300 }}
          />
        }
      />
      <CustomBottomNavigationAction
        label="보도 작성"
        onClick={handleMoveRequestPost}
        icon={
          <AddBoxRoundedIcon
            style={{ color: value === 1 ? "#000" : COLOR.Gray300 }}
          />
        }
      />
      <CustomBottomNavigationAction
        label="마이페이지"
        onClick={handleMoveMy}
        icon={
          <PermIdentityIcon
            style={{ color: value === 2 ? "#000" : COLOR.Gray300 }}
          />
        }
      />
    </CustomBottomNavigation>
  );
};

export default BottomNav;

const CustomBottomNavigation = styled(BottomNavigation)`
  position: sticky;
  bottom: 0;
  width: 100%;
  gap: 46px;
`;
