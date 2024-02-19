import { PropsWithChildren } from "react";
import styled from "styled-components";
import BottomNav from "../components/BottomNav";
import CenteredTabs from "../components/Tabs";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <CenteredTabs />
      <MainContent>{children}</MainContent>
      {/* TODO: Add Chanel Talk */}
      <BottomNav />
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 16px;
  min-height: 100vh; /* Changed height to min-height */
`;

const MainContent = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 60px; /* Adjust as needed */
`;