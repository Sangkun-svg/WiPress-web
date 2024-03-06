import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { supabase } from "@/utils/database";
import { NavBar, BasicPostItem} from '@/components';

export const getServerSideProps = async (context: any) => {
    const { type, startDate, endDate, keyword } = context.query;
    const req = context.req as any;
    const res = context.res as any;
    const session = await getServerSession(req, res, authOptions);
  
      let result = {};
    // TODO: type, startDate, endDate, keyword 이 4개중에 값이 없는게 있으면 어케함?
      if (type === "recentDates") {
        const { data, error } = await supabase
          .from("Post")
          .select("id,title,content,image,picks,Pick(*)")
          .like("title", `%${keyword}%`)
          .gte("created_at", startDate)
          .lte("created_at", endDate)
          .order("created_at", { ascending: false });
          if (error) throw new Error(error.message);
          result = data;
        }

      if (type === "orderOfLikes") {
        const { data, error } = await supabase
          .from("Post")
          .select("id,title,content,image,likes,Pick(*)")
          .like("title", `%${keyword}%`)
          .gte("created_at", startDate)
          .lte("created_at", endDate)
          .order("likes", { ascending: false });
        if (error) throw new Error(error.message);
        result = data;
      }
  
      if (type === "orderOfPicks") {
        const { data, error } = await supabase
          .from("Post")
          .select("id,title,content,image,picks,Pick(*)")
          .like("title", `%${keyword}%`)
          .gte("created_at", startDate)
          .lte("created_at", endDate)
          .order("picks", { ascending: false });
        if (error) throw new Error(error.message);
        result = data;
      }
        
      if (type === "myPicks") {
        const { data, error } = await supabase
          .from("Pick")
          .select("*, Post(id,title,content,image,picks)")
          .like("Post.title", `%${keyword}%`)
          .gte("Post.created_at", startDate)
          .lte("Post.created_at", endDate)
          .eq("user_id", (session as any).user.id);
        if (error) throw new Error(error.message);
        result = data;
      }
  
      return { 
        props: {
          result : result,
          type: type,
          user_id: (session?.user as any).id
        } 
      };
  };
  

const SearchResult = (props:any) => {
    return (
      <div className='max-w-[600px] flex justify-center items-center flex-col mx-auto my-0 px-4 py-0'>
        <NavBar title={"검색 결과"} backgroundColor={"#fff"}/>
        <div className='w-full flex flex-col mt-[26px] mb-4 mx-0'>
          <div className='flex flex-col gap-3.5'>
          {props.type !== "myPicks" && props.result.map((el:any) => {
            return <BasicPostItem 
                      key={el.id}          
                      id={el.id}
                      user_id={props.user_id}
                      title={el.title}
                      content={el.content}
                      images={el.image}
                      picks={el.picks}
                      Pick={el.Pick}
                    />
          })}
          {props.type === "myPicks" && props.result
            .filter((el:any) => el.Post)
            .map((el:any) => (
              <BasicPostItem 
                key={el.user_post_pick_id} 
                id={el.post_id} 
                user_id={props.user_id} 
                title={el.Post.title} 
                content={el.Post.content} 
                images={el.Post.image} 
                picks={el.Post.picks} 
                Pick={[{user_id: el.user_id}]}
              />
            ))}
          </div>
        </div>
      </div>
    )
};

export default SearchResult;
