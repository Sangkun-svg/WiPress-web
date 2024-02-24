import styled from "styled-components";
import Layout from "../components/Layout";
import ShortBoard from "../components/ShortBoard";
import { useSession } from "next-auth/react";

export const TAB_ITEMS = [
  {
    label: "보도요청",
    key: "registerPost",
  },
  {
    label: "전체기사",
    key: "article",
  },
  {
    label: "공지사항",
    key: "notice",
  },
  {
    label: "자료실",
    key: "info",
  },
];

const Home = () => {
  return (
    <Layout>
      <Container>
        {TAB_ITEMS.map((el) => {
          return <ShortBoard key={el.key} type={el.key} label={el.label} />;
        })}
      </Container>
    </Layout>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
  margin: 26px 0 16px;
  display: flex;
  flex-direction: column;
  gap: 32px 0;
`;
