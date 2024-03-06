import styled from 'styled-components';
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { supabase } from "@/utils/database";
import NavBar from '@/components/NavBar';
import { title } from 'process';
import BasicPostItem from '@/components/PostItems/BasicPostItem';

type Parmas = {
    type : string
    startDate : string
    endDate : string
    keyword : string
}

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
      <Wrapper>
        <NavBar title={"검색 결과"}/>
        <Container>
          <PostItemList>
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
          </PostItemList>
        </Container>
      </Wrapper>
    )
};

export default SearchResult;

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 16px;
`;
const Container = styled.div`
  width: 100%;
  margin: 26px 0 16px;
  display: flex;
  flex-direction: column;
`;

const PostItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;