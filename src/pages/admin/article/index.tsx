import { supabase } from '@/utils/database';
import { Stack } from '@mui/material';
import styled from 'styled-components';
import { AdminLayout,AdminArticleListItem } from '@/components/admin';

export const getServerSideProps = async () => { 
    const { data, error } = await supabase
    .from("Post")
    .select("*")
    .eq("type","article");
    console.log({data})
    if(error) throw new Error(error.message);
    return { props: {
        article: data,
    } } 
}

const AdminArticle = (props:any) => {
    return (
        <AdminLayout>
            <Stack spacing={2}>
                {props && props.article.map((el:any) => {
                    return <AdminArticleListItem key={el.id} post={el} type={"article"}/>
                })}
            </Stack>
        </AdminLayout>
    )
};

export default AdminArticle;
