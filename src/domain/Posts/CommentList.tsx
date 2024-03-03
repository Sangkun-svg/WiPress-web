import styled from 'styled-components';
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
        <Container>
            <CommentContainer>
                <CommentCount>댓글 {commentList.length}</CommentCount>
                <CommentInput
                    value={comment}
                    onChange={handleComment}
                    placeholder="ex. Pick한 기자만 댓글을 달 수 있습니다"
                    disabled={!Boolean(isPickedStatus)}
                />
                <button type="button" style={{float: "inline-end", marginTop: "14px"}} onClick={handleUploadComment}>
                    댓글달기
                </button>
            </CommentContainer>

            <CommentItemList>
                {commentList.map((el:any) => {
                    return (
                        <CommentItem key={el.id}>
                            <p>기자{el.User.name} · {el.User.party}소속</p>
                            <p>{el.content}</p>
                            <p>{calculateTimeAgo(el.created_at)}</p>
                        </CommentItem>
                    )
                })}
            </CommentItemList>
        </Container>
    )
};

export default CommentList;

const Container = styled.div``;
const CommentContainer = styled.div`
  padding: 0 16px;
`;
const CommentCount = styled.p`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 15px */
  margin-bottom: 10px;
`;
const CommentInput = styled.input`
  width: 100%;
  max-height: 50px;
  border-radius: 6px;
  padding: 18px 16px;
  background-color: #f7f7fa;
`;
const CommentItemList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 34px;
  padding: 0 16px;
  margin: 18px 0 28px;
`;
const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  p {
    color: #636366;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
  }
`;