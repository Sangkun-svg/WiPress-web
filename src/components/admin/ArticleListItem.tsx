import { IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { supabase } from '../../utils/database';

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

const AdminArticleListItem = ({post, type}:Props) => {
    const router = useRouter();
    const handleDetailPage = () => router.push(post.link);
    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        await supabase.from("Post").delete().eq("id" , post.id);
    }

    return (
        <Container onClick={handleDetailPage}>
            <Item>{post.title}</Item>
            <IconButton onClick={handleDelete}>
                <DeleteIcon/>
            </IconButton>
        </Container>
    )
};

export default AdminArticleListItem;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    cursor: pointer;
    border: 1px solid;
`;