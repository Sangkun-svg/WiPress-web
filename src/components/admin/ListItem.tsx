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
        <div className='flex justify-between cursor-pointer border px-4 py-3 border-solid' onClick={() => handleDetailPage(post.id)}>
            <Item>{post.title}</Item>
            {type === "registerPost" && <p>{isAccepted ? "승인" : "미승인"}</p>}
        </div>
    )
};

export default AdminListItem;
