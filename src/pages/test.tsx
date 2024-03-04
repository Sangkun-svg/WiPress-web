import styled from 'styled-components';
import { signOut } from 'next-auth/react';

interface Props {}

const Name = () => {
    const handlesignOut = () => signOut();
    return <Container>
        <button onClick={handlesignOut}>로그아웃</button>
    </Container>
};

export default Name;

const Container = styled.div``;