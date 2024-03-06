import { AppBar, Toolbar, IconButton } from "@mui/material";
import ArrowBackIosNewTwoToneIcon from "@mui/icons-material/ArrowBackIosNewTwoTone";
import { useRouter } from "next/navigation";

interface Props {
  title?: string;
  backgroundColor?:string;
}

const NavBar = ({ title,backgroundColor = "#F0F6F4" }: Props) => {
  const router = useRouter();
  const handleClick = () => router.back();

  return (
    <AppBar
      position="sticky"
      style={{ background: backgroundColor, minHeight: "44px", boxShadow: "none", zIndex: 998 }}
    >
      <Toolbar style={{ gap: 12 }}>
        <IconButton edge="start" aria-label="menu" onClick={handleClick}>
          <ArrowBackIosNewTwoToneIcon />
        </IconButton>
        {title && <p className="text-[#242424] text-[17px] not-italic font-medium leading-[100%] tracking-[0.17px]">{title}</p>}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
