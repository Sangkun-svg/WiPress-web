import { AppBar, Toolbar, IconButton } from "@mui/material";
import ArrowBackIosNewTwoToneIcon from "@mui/icons-material/ArrowBackIosNewTwoTone";
import styled from "styled-components";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
}

const NavBar = ({ title }: Props) => {
  const router = useRouter();
  const handleClick = () => router.back();

  return (
    <AppBar
      position="sticky"
      style={{ background: "#fff", minHeight: "44px", boxShadow: "none" }}
    >
      <Toolbar style={{ gap: 12 }}>
        <IconButton edge="start" aria-label="menu" onClick={handleClick}>
          <ArrowBackIosNewTwoToneIcon />
        </IconButton>
        <Typography>{title}</Typography>
      </Toolbar>
    </AppBar>
  );
};

const Typography = styled.p`
  color: #242424;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 17px */
  letter-spacing: 0.17px;
`;
export default NavBar;
