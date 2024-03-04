import styled from "styled-components";
import {
  BottomNavigation,
  BottomNavigationAction,
  styled as muiStyled,
} from "@mui/material";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const setCurrentTab = (pathname: string): number | undefined => {
  if (pathname === "/requestPost") return 1;
  else if (pathname === "/my" || pathname === "/myPicks") return 2;
  else if (pathname === "/admin") return 3;
  else return 0;
};

const BottomNav = () => {
  const router = useRouter();
  const session = useSession();
  const pathname = usePathname();
  const [value, setValue] = useState(0);
  const handleMoveBoard = () => router.push("/");
  const handleMoveRequestPost = () => router.push("/requestPost");
  const handleMoveMy = () => router.push("/my");
  const handleMoveAdmin = () => router.push("/admin");

  const CustomBottomNavigationAction = muiStyled(BottomNavigationAction)`
    .MuiBottomNavigationAction-label {
      font-size: 0.75rem;
    }
    .Mui-selected {
      color: #303030;
    }
  `;

  useEffect(() => {
    const currentTabNumber = setCurrentTab(pathname);
    setValue(currentTabNumber as number);
  }, [pathname]);

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
            style={{ color: value === 0 ? "#000" : "#AEAEB2" }}
          />
        }
      />
      {
        (session.data?.user as any)?.role === "admin" && 
        <CustomBottomNavigationAction
          label="관리자"
          onClick={handleMoveAdmin}
          icon={
            <AdminPanelSettingsIcon
              style={{ color: value === 3 ? "#000" : "#AEAEB2" }}
            />
          }
        />
      }
      {
        (session.data?.user as any)?.role !== "admin" &&
        (session.data?.user as any)?.type !== "reporter" && 
        <CustomBottomNavigationAction
          label="보도 작성"
          onClick={handleMoveRequestPost}
          icon={
            <AddBoxRoundedIcon
              style={{ color: value === 1 ? "#000" : "#AEAEB2" }}
            />
          }
        />
      }
      <CustomBottomNavigationAction
        label="마이페이지"
        onClick={handleMoveMy}
        icon={
          <PersonIcon style={{ color: value === 2 ? "#000" : "#AEAEB2" }} />
        }
      />
    </CustomBottomNavigation>
  );
};

export default BottomNav;

const CustomBottomNavigation = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  width: 100%;
  gap: 46px;
`;
