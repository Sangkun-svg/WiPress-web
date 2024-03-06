import { IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { supabase } from '../../utils/database';

const Item = styled(Paper)(() => ({
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
        <div className='flex items-center justify-between cursor-pointer border px-4 py-3 border-solid' onClick={handleDetailPage}>
            <Item>{post.title}</Item>
            <IconButton onClick={handleDelete}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
};

export default AdminArticleListItem;