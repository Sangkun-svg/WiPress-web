import { PropsWithChildren } from "react";
import styled from "styled-components";
import BottomNav from "../components/BottomNav";
import CenteredTabs from "../components/Tabs";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <CenteredTabs />
      {children}
      <BottomNav />
      {/* TODO: Add Chanel Talk */}
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 16px;
`;
