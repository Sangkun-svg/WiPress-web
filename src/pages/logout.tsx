import styled from 'styled-components';
import { signOut } from "next-auth/react";


const Name = () => {
    const handleSignout = () => signOut({callbackUrl: "/signin"})
    return (
        <Container>
            <button onClick={handleSignout}>로그아웃</button>
        </Container>
    )
};

export default Name;

 const Container = styled.div``; 


