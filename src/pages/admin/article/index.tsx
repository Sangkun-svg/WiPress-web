import { supabase } from '@/utils/database';
import { Stack } from '@mui/material';
import styled from 'styled-components';
import { AdminLayout,AdminListItem } from '@/components/admin';

export const getServerSideProps = async () => { 
    const { data, error } = await supabase.from("Post").select().eq("type","article");
    if(error) throw new Error(error.message);
    return { props: {
        article: data,
    } } 
}

const AdminArticle = ({props}:any) => {
    console.log(props)
    return (
        <AdminLayout>
            <Stack spacing={2}>
                {props && props.article.map((el:any) => {
                    return <AdminListItem post={el} type={"article"}/>
                })}
            </Stack>
        </AdminLayout>
    )
};

export default AdminArticle;
