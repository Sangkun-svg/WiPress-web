import { getServerSession } from "next-auth";
import { authOptions } from '../api/auth/[...nextauth]';
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

    const { data: AcceptedPost, error } = await supabase
    .from('AcceptedPost')
    .select(`*, Post (* , Pick( * ) )`)
    .eq("Post.type", "registerPost")
    .order('created_at', { ascending: false });
  
    return {
        props : {
            AcceptedPost: AcceptedPost
        }
    }
}

interface Props  {
    window?: () => Window,
    AcceptedPost:any
}

const Admin = (props: Props) => {
    console.log(props)
    return (
        <AdminLayout>
            <Stack spacing={2}>
                {props.AcceptedPost.map((el:any) => {
                    if(!el.Post) return null;
                    return <AdminListItem key={el.id} post={el.Post} type={"registerPost"} isAccepted={el.isAccepted}/>
                })}
            </Stack>
        </AdminLayout>
    )
};

export default Admin;

