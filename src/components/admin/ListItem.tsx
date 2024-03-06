import { Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'left',
    color: "#000",
    boxShadow: "none"
  }));

interface Props {
    post:any;
    type:string;
    isAccepted?:boolean
}

const AdminListItem = ({post, type ,isAccepted}:Props) => {
    const router = useRouter();
    const handleDetailPage = (id:string) => router.push(`/admin/${type}/${id}`) 

    return (
        <Container onClick={() => handleDetailPage(post.id)}>
            <Item>{post.title}</Item>
            {type === "registerPost" && <p>{isAccepted ? "승인" : "미승인"}</p>}
        </Container>
    )
};

export default AdminListItem;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    cursor: pointer;
    border: 1px solid;
`;