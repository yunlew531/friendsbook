import React from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'components/Card';
import Btn from 'components/Btn';

const CommentItem = styled.li<IThemeProps>`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const CommentUserPhoto = styled.img<IThemeProps>`
  align-self: flex-start;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 2px solid ${({ theme }) => theme.color.white_100};
  box-shadow: ${({ theme }) => theme.shadow.s};
  margin-right: 10px;
  border-radius: 100%;
`;

const CommentMain = styled(Card)<IThemeProps>`
  min-width: 200px;  
  max-width: 450px;
  padding: 5px 10px;
`;

const CommentMainHeader = styled.div<IThemeProps>`
  display: flex;
  justify-content: space-between;
  a {
    text-decoration: none;
    transition: filter .1s ease-in-out;
    cursor: default;
    &:hover {
      filter: brightness(0.8);
    }
  }
`;

const CommentMainFooter = styled.div`
  display: flex;
  align-items: center;
`;

const CommentFooterBtn = styled(Btn)<IThemeProps>`
  .material-icons-outlined {
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
    color: ${({ theme }) => theme.color.gray_300};
  }
  &:hover {
    .material-icons-outlined {
      color: ${({ theme }) => theme.color.black_100};
    }
  }
`;

const CommentTime = styled.p<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.fs_5};
  color: ${({ theme }) => theme.color.gray_300};
  margin-right: auto;
`;

const CommentUsername = styled.p<IThemeProps>`
  color: ${({ theme }) => theme.color.primary};
  margin-right: 8px;
`;

const CommentContent = styled.p`
  margin: 5px 0;
`;

const CommentMoreBtn = styled(Btn)<IThemeProps>`
  display: flex;
  align-items: center;
  border-radius: 10px;
  transition: background-color .1s ease-in-out;
  .more-icon {
    font-size: ${({ theme }) => theme.fontSizes.fs_1};
    color: ${({ theme }) => theme.color.gray_500};
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.gray_400};
  }
  &:active {
    transform: scale(0.9);
  }
`;

interface CommentProps {
  comment: IComment;
}

// eslint-disable-next-line arrow-body-style
const Comment: React.FC<CommentProps> = ({ comment }) => {
  const navigate = useNavigate();
  const { author, content, created_at: createAt } = comment;

  return (
    <CommentItem key={comment.id}>
      <CommentUserPhoto
        src={author?.avatar_url || `${process.env.PUBLIC_URL}/images/avatar.png`}
        onError={({ currentTarget }) => { currentTarget.src = `${process.env.PUBLIC_URL}/images/avatar.png`; }}
        alt={author?.name}
        onClick={() => navigate(`/${author?.uid}`)}
      />
      <CommentMain>
        <CommentMainHeader>
          <Link to={`/${author?.uid}`}>
            <CommentUsername>{author?.name}</CommentUsername>
          </Link>
          <CommentMoreBtn type="button">
            <span className="material-icons-outlined more-icon">more_horiz</span>
          </CommentMoreBtn>
        </CommentMainHeader>
        <CommentContent>{content}</CommentContent>
        <CommentMainFooter>
          <CommentTime>{dayjs((createAt || 0) * 1000).format('YYYY/MM/DD HH:mm:ss')}</CommentTime>
          <CommentFooterBtn type="button" anime>
            <span className="material-icons-outlined">thumb_up</span>
          </CommentFooterBtn>
          <CommentFooterBtn type="button" anime>
            <span className="material-icons-outlined">reply</span>
          </CommentFooterBtn>
        </CommentMainFooter>
      </CommentMain>
    </CommentItem>
  );
};

export default Comment;
