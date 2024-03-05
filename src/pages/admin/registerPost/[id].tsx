import styled from 'styled-components';
import { supabase } from '@/utils/database';
import { ImageSwiper } from '@/components';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {}

export const getServerSideProps = async (context:any) => { 
    const id = context.query.id;
    const { data, error } = await supabase
    .from('AcceptedPost')
    .select(`*, Post (* , Pick( * ) )`)
    .eq("post_id", id)
    .order('created_at', { ascending: false });

    if(error) throw new Error(error.message);

    return { 
        props: {
            post: data![0],
            post_id: id
        } 
    } 
}

const AdminRegisterPostDetail = ({post,post_id}:any) => {
    const router = useRouter()
    const [isAccepted,setIsAccepted] = useState<boolean>(post.isAccepted)
    const handleDelete = async () => {
      const {error} = await supabase.from('AcceptedPost').delete().eq('post_id', post_id);
      if(error) throw new Error(error.message);
      router.push("/admin")
    };

    const handleAccept = async () => {
      const { data, error } = await supabase.from('AcceptedPost')
      .update({ isAccepted: !isAccepted })
      .eq('post_id', post_id)
      .select();
      setIsAccepted(prev => !prev);
    };
    return (
        <Container>
            <ContentContainer>
                <Title>{post.Post.title}</Title>
                <SubTitle>{post.Post.subtitle}</SubTitle>
                <Description>{post.Post.content}</Description>
                {post.Post.image && <ImageSwiper images={post.Post.image}/>}
            </ContentContainer>
            <ButtonContainer>
                <Button variant="outlined" onClick={handleAccept} color={isAccepted ? "error" : "primary"}>{isAccepted ? "승인해제" : "승인"}</Button>
                <Button variant="outlined" color="error" onClick={handleDelete}>삭제</Button>
            </ButtonContainer>
        </Container>
    )
};

export default AdminRegisterPostDetail;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: end;
    width: 100%;
    margin: 0 auto;
    gap: 12px;
    margin-top : 12px;
  `;
const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;
const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px 16px 28px;
  background: #f7f7fa;
  gap: 13px;
`;
const Title = styled.p`
  color: #000;
  font-size: 19px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
`;
const SubTitle = styled.p`
  color: #4a4a4a;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;
const Description = styled.text`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
`;
