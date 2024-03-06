import { getServerSession } from "next-auth";
import { authOptions } from '../../api/auth/[...nextauth]';
import { supabase } from "@/utils/database";
import { AdminListItem,AdminLayout } from "@/components/admin";
import { Stack } from "@mui/material";

export const getServerSideProps = async (context:any) => {
    const req = context.req as any;
    const res = context.res as any;
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        return {
          redirect: {
            destination: '/signin',
            permanent: false,
          },
        }
    }
    if ((session?.user as any)?.role !== "admin") {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
    }

    const { data: Post, error } = await supabase
    .from('Post')
    .select(`*, Pick( * )`)
    .eq("type", "info")
    .order('created_at', { ascending: false });
  
    return {
        props : {
            Post: Post,
        }
    }
}

const AdminInfoPage = (props:any) => {
    return (
      <AdminLayout>
        <Stack spacing={2}>
          {props.Post.map((el:any) => {
            return <AdminListItem key={el.id} post={el} type={"info"}/>
          })}
        </Stack>
      </AdminLayout>
)};

export default AdminInfoPage;