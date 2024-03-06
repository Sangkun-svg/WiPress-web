import { supabase } from '@/utils/database';
import { ImageSwiper } from '@/components';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
      <div className='w-full max-w-[600px] mx-auto my-0'>
            <div className='w-full flex flex-col justify-center bg-[#f7f7fa] gap-[13px] pt-6 pb-7 px-4'>
                <p className='text-[19px] not-italic font-semibold leading-[100%]'>{post.Post.title}</p>
                <p className='text-[#4a4a4a] text-[17px] not-italic font-medium leading-[100%]'>{post.Post.subtitle}</p>
                <p className='text-black text-[15px] not-italic font-normal leading-[170%]'>{post.Post.content}</p>
                {post.Post.image && <ImageSwiper images={post.Post.image}/>}
            </div>
            <div className='flex justify-end w-full gap-3 mt-3 mx-auto my-0'>
                <Button variant="outlined" onClick={handleAccept} color={isAccepted ? "error" : "primary"}>{isAccepted ? "승인해제" : "승인"}</Button>
                <Button variant="outlined" color="error" onClick={handleDelete}>삭제</Button>
            </div>
        </div>
    )
};

export default AdminRegisterPostDetail;
