import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";

interface Props {
  label: string;
  type: string;
  data?: Array<string>; // origin data from db
}

const ShortBoard = ({ label, type, data }: Props) => {
  const router = useRouter();
  const handleMoveDetail = (id: string) => {
    router.push(`${type}/${id}`)
  }
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div className="w-full flex justify-between items-baseline">
        <p className="text-[19px] not-italic font-semibold leading-[100%]">{label} 게시판</p>
        <Link className="text-[#8e8e93] text-sm not-italic font-normal leading-[100%]" href={`/${type}`}>전체보기</Link>
      </div>
      <div className="w-full flex flex-col mt-1">
        {data?.map((el:any) => {
          const post = type === "registerPost" ? el.Post : el;
          if(!post) return null;
          return (
            <PostPreviewItem key={el.id} onClick={() => handleMoveDetail(post.id)} >
              <p className="text-[15px] not-italic font-light leading-[100%] tracking-[0.15px]">{post?.title}</p>
            </PostPreviewItem>
          )
        })}
      </div>
    </div>
  );
};

export default ShortBoard;

const PostPreviewItem = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 46px;
  &:not(:last-child) {
    border-bottom: 1px solid #e5e5ea;
  }
`;

