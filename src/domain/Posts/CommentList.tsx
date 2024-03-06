import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { ChangeEvent } from 'react';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface Props {
    commentList: any[],
    comment: string,
    handleComment: (event:ChangeEvent<HTMLInputElement>) => void,
    isPickedStatus: boolean,
    handleUploadComment: () => void
}

const CommentList = ({commentList,comment,isPickedStatus,handleComment,handleUploadComment}:Props) => {
    const calculateTimeAgo = (createdAt: string) => {
        const now = dayjs();
        const timeAgo = dayjs(createdAt);
        return timeAgo.from(now);
    }

    return( 
        <div>
          <div className="px-4 py-0">
            <p className="text-[15px] not-italic font-medium leading-[100%] mb-[10px]">댓글 {commentList.length}</p>
            <input
                className="w-full max-h-[50px] px-4 py-[18px] rounded-md"
                style={{marginTop: "10px"}}
                value={comment}
                onChange={handleComment}
                placeholder="Pick한 기자만 댓글을 달 수 있습니다"
                disabled={!Boolean(isPickedStatus)}
            />
            <button type="button" style={{float: "inline-end", marginTop: "14px"}} onClick={handleUploadComment}>
                댓글달기
            </button>
          </div>

          <div className="w-full flex flex-col mt-[18px] mb-7 mx-0 px-4 py-0" style={{gap: 34}}>
            {commentList.map((el:any) => {
              return (
                <div className='flex flex-col gap-3.5' key={el.id}>
                  <p className='text-[#636366] not-italic font-medium leading-[100%]'>{el.User.name} 기자 · {el.User.party}소속</p>
                  <p className='text-[#636366] not-italic font-medium leading-[100%] overflow-hidden text-ellipsis'
                     style={{display: "-webkit-box", WebkitLineClamp: 2,lineClamp: 2, WebkitBoxOrient: "vertical"}}
                  >
                    {el.content}
                  </p>
                  <p className='text-[#636366] not-italic font-medium leading-[100%]'>{calculateTimeAgo(el.created_at)}</p>
                </div>
              )
            })}
          </div>
        </div>
    )
};

export default CommentList;