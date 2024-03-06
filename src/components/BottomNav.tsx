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
  else if (pathname === "/my" || pathname === "/myPicks" || pathname === "/admin") return 2;
  else return 0;
};

const BottomNav = () => {
  const router = useRouter();
  const session = useSession();
  const pathname = usePathname();
  const [value, setValue] = useState(0);
  const handleMoveBoard = () => {
    setValue(0);
    // router.push("/")
  };
  const handleMoveRequestPost = () => {
    setValue(1);
    // router.push("/requestPost")
  };
  const handleMoveMy = () => {
    setValue(2);
    // router.push("/my")
  };
  const handleMoveAdmin = () => {
    setValue(3);
    // router.push("/admin")
  };

  const CustomBottomNavigationAction = muiStyled(BottomNavigationAction)`
    .MuiBottomNavigationAction-label {
      font-size: 0.75rem;
    }
    .Mui-selected {
      color: #0B834B;
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
        console.log({newValue})
        setValue(newValue);
      }}
    >
      <CustomBottomNavigationAction
        label="게시판"
        onClick={handleMoveBoard}
        icon={
          <GridViewRoundedIcon
            style={{ color: value === 0 ? "#0B834B" : "#AEAEB2" }}
          />
        }
      />
      {
        (session.data?.user as any)?.role !== "admin" &&
        (session.data?.user as any)?.type !== "reporter" && 
        <CustomBottomNavigationAction
          label="보도 작성"
          onClick={handleMoveRequestPost}
          icon={
            <AddBoxRoundedIcon
              style={{ color: value === 1 ? "#0B834B" : "#AEAEB2" }}
            />
          }
        />
      }
      {(session.data?.user as any)?.role !== "admin" && 
        <CustomBottomNavigationAction
          label="마이페이지"
          onClick={handleMoveMy}
          icon={
            <PersonIcon style={{ color: value === 2 ? "#0B834B" : "#AEAEB2" }} />
          }
        />
      }
      {
        (session.data?.user as any)?.role === "admin" && 
        <CustomBottomNavigationAction
          label="관리자"
          onClick={handleMoveAdmin}
          icon={
            <AdminPanelSettingsIcon
              style={{ color: value === 2 ? "#0B834B" : "#AEAEB2" }}
            />
          }
        />
      }
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
