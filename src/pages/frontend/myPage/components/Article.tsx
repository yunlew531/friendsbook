import React, { useEffect, useRef, useState } from 'react';
import Card from 'components/Card';
import styled from '@emotion/styled';
import Btn from 'components/Btn';
import dayjs from 'dayjs';
import quillDeltaToHtml from 'utils/quillDeltaToHtml';
import {
  useLazyGetCommentsByArticleIdQuery, useThumbsUpArticleMutation, usePostCommentMutation,
  useLazyGetThumbsUpByArticleIdQuery,
  useDeleteArticleMutation,
} from 'services/article';
import { useAppSelector } from 'hooks';
import Comment from 'pages/frontend/MyPage/components/Comment';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ArticleCard = styled(Card)<IThemeProps>`
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.s};
  border: 1px solid ${({ theme }) => theme.color.gray_200};
  border-bottom: none;
  margin-bottom: 20px;
  padding: 20px 0 0;
`;

const Header = styled.div<IThemeProps>`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 0 20px;
  a {
    display: inline-block;
    font-weight: 700;
    text-decoration: none;
    cursor: default;
    color: ${({ theme }) => theme.color.blue_300};
    margin-bottom: 3px;
    transition: color .1s ease-in-out;
    &:hover {
      color: ${({ theme }) => theme.color.primary};
    }
  }
`;

const UserPhoto = styled.img<IThemeProps>`
  width: 55px;
  height: 55px;
  box-shadow: ${({ theme }) => theme.shadow.m};
  border-radius: 100%;
  padding: 2px;
  margin-right: 18px;
  border-radius: 100%;
  transition: filter .1s ease-in-out;
  &:hover {
    filter: brightness(0.9);
  }
`;

const ArticleTime = styled.p<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.fs_5};
  color: ${({ theme }) => theme.color.gray_500};
`;

const MoreBtnContainer = styled.div`
  position: relative;
  align-self: flex-start;
  margin-left: auto;
  &:hover {
    .more-btn {
      filter: brightness(0.9);
    }
  }
`;

const ArticleMoreList = styled.ul<IThemeProps>`
  width: 80px;
  position: absolute;
  bottom: -2px;
  right: 0;
  z-index: 10;
  overflow: hidden;
  transform: translateY(100%);
  border: 1px solid ${({ theme }) => theme.color.gray_400};
  box-shadow: ${({ theme }) => theme.shadow.m};
  background-color: ${({ theme }) => theme.color.white_100};
  border-radius: 8px;
  list-style: none;
  li {
    border-bottom: 1px solid ${({ theme }) => theme.color.gray_400};
    text-align: center;
    &:last-of-type {
      border-bottom: none;
    }
    button {
      border: none;
      width: 100%;
      background-color: ${({ theme }) => theme.color.white_100};
      font-size: ${({ theme }) => theme.fontSizes.fs_4};
      color: ${({ theme }) => theme.color.black_300};
      font-weight: 700;
      padding: 10px;
      &:hover {
        filter: brightness(0.97);
      }
      &:active {
        filter: brightness(0.95);
      }
    }
    .delete-article-btn{
      color: ${({ theme }) => theme.color.red_100};
    }
  }
`;

const MoreBtn = styled.button<IThemeProps>`
  position: relative;
  display: flex;
  align-items: center;
  border: none;
  background-color: ${({ theme }) => theme.color.white_100};
  border-radius: 8px;
  transition: filter .1s ease-in-out, transform .1s ease-in-out;
  padding: 1px 6px;
  cursor: default;
  .more-horiz-icon {
    color: ${({ theme }) => theme.color.gray_300};
  }
  &:active {
    transform: scale(0.95);
  }
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 0;
  }
`;

const Content = styled.div<IThemeProps>`
  line-height: 1.5;
  margin-bottom: 20px;
  padding: 0 25px;
  .ql-editor {
    p {
      font-size: ${({ theme }) => theme.fontSizes.fs_3};
    }
    padding: 0;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: end;
  padding: 0 20px 10px;
  margin-top: 5px;
`;

const ThumbsUpBtnContainer = styled.div`
  position: relative;
`;

const ThumbsUpUsersContainer = styled.div<IThemeProps & { show: boolean }>`
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ show }) => (show ? 1 : 0)};
  display: flex;
  align-items: center;
  position: absolute;
  top: calc(-100% - 30px);
  left: 50%;
  box-shadow: ${({ theme }) => theme.shadow.s};
  background-color: ${({ theme }) => theme.color.white_100};
  border: 1px dashed red;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.gray_400};
  transform: translateX(-50%);
  padding: 8px;
  transition: visibility .2s, opacity .2s ease-in-out;
  &::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    height: 10px;
    width: 100%;
  }
`;

const ThumbsUpUser = styled.div`
  display: flex;
  align-items: center;
  &.thumbs-up-user{
    transition: transform 0.1s ease-in-out;
    &:hover {
      transform: scale(0.95);
    }
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 100%;
  }
`;

interface IFooterBtnProps {
  active?: boolean;
}

const FooterBtn = styled(Btn)<IThemeProps & IFooterBtnProps>`
  position: relative;
  color: ${({ theme }) => theme.color.gray_300};
  margin: 0 6px;
  .thumbs-up-icon {
    transition: transform .1s ease-in-out;
    font-size: ${({ theme }) => theme.fontSizes.fs_1};
    color: ${({ theme: { color: { primary } }, active }) => (active ? primary : 'default')}
  }
  .material-icons-outlined {
    display: ${({ active }) => (active ? 'none' : 'block')};
  }
  .material-icons {
    display: ${({ active }) => (active ? 'block' : 'none')};
  }
  .interact-num {
    position: absolute;
    top: -5px;
    right: -3px;
  }
  &:hover {
    .thumbs-up-icon {
      transform: scale(1.05);
    }
  }
`;

const CommentListContainer = styled.div<IThemeProps>`
  background-color: ${({ theme }) => theme.color.white_200};
  padding: 20px;
`;

const CommentList = styled.ul <IThemeProps>`
  list-style: none;
`;

const SalesDetail = styled.div<IThemeProps>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.gray_200};
  border: 1px solid ${({ theme }) => theme.color.gray_100};
  margin: 0 20px 20px;
  padding: 10px 20px;
`;

const SalesMain = styled.div<IThemeProps>`
  span {
    display: inline-block;
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
    margin-bottom: 3px;
    &:first-of-type {
      font-weight: 700;
      color: ${({ theme }) => theme.color.primary};
    }
    &:nth-of-type(2) {
      margin-left: 5px;
      color: ${({ theme }) => theme.color.gray_500};
    }
  }
`;

const SendMsgBtn = styled(Btn)<IThemeProps>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.secondary};
  border-radius: 8px;
  color: ${({ theme }) => theme.color.white_100};
  font-weight: 700;
  padding: 6px 10px;
  margin-left: auto;
  .material-icons-outlined {
    margin-right: 3px;
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
  }
`;

const InputSection = styled.div<IThemeProps>`
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.color.gray_400};
  background-color: ${({ theme }) => theme.color.gray_200};
  padding: 10px 20px;
  img {
    width: 30px;
    height: 30px;
    box-shadow: ${({ theme }) => theme.shadow.m};
    border-radius: 100%;
    margin-right: 16px;
  }
  input {
    flex-grow: 1;
    border: 1px solid ${({ theme }) => theme.color.gray_300};
    margin-right: 10px;
    padding: 5px 10px;
    border-radius: 5px;
    &:focus {
      border: 1px solid transparent;
      outline: 1px solid ${({ theme }) => theme.color.primary};
    }
  }
`;

const PostCommentBtn = styled(Btn)<IThemeProps>`
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white_100};
  border-radius: 5px;
  padding: 5px 10px;
`;

interface IArticleProps {
  sale?: boolean;
  data?: IArticle;
  refreshThumbsUp: (articleId: string, thumbsUp: IThumbsUp[]) => void;
  refreshComments: (articleId: string, comments: IComment[]) => void;
  onDeleteArticle: (articleId: string) => void;
}

const Article: React.FC<IArticleProps> = ({
  sale, data, refreshThumbsUp, refreshComments, onDeleteArticle,
}) => {
  const {
    author, created_at: publishedAt, content, comments, id: articleId, article_likes: thumbsUp,
  } = data || {};
  const { uid: paramsUid } = useParams();
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.userInfo.profile);
  const [postCommentTrigger, postCommentResult] = usePostCommentMutation();
  const [
    getCommentsByArticleIdTrigger, getCommentsByArticleResult,
  ] = useLazyGetCommentsByArticleIdQuery();
  const [thumbsUpArticleTrigger, thumbsUpArticleResult] = useThumbsUpArticleMutation();
  const [getThumbsUpByArticleId, getThumbsUpByArticleIdResult,
  ] = useLazyGetThumbsUpByArticleIdQuery();
  const [deleteArticleTrigger, deleteArticleResult] = useDeleteArticleMutation();
  const contentRef = useRef<HTMLDivElement>(null);
  const [commentInput, setCommentInput] = useState('');
  const [isThumbsUpUserShow, setIsThumbsUpUserShow] = useState(false);
  const [isMoreListShow, setIsMoreListShow] = useState(false);

  const postComment = () => {
    if (!articleId) return;
    if (!commentInput.trim()) {
      toast.error('請輸入內容!');
      return;
    }
    const reqData = { articleId, content: commentInput };
    postCommentTrigger(reqData);
  };

  useEffect(() => {
    const convertContent = () => {
      if (!content || !contentRef.current) return;

      if (typeof content !== 'string') {
        const html = quillDeltaToHtml(content);
        contentRef.current.appendChild(html);
      }
    };

    convertContent();
  }, []);

  useEffect(() => {
    const handlePostComment = () => {
      if (!articleId) return;
      setCommentInput('');
      getCommentsByArticleIdTrigger(articleId);
    };

    if (postCommentResult.isSuccess) handlePostComment();
  }, [postCommentResult]);

  useEffect(() => {
    const handleGetComments = () => {
      const { isSuccess } = getCommentsByArticleResult;
      if (!isSuccess || !articleId) return;
      const { data: { comments: commentsRes } } = getCommentsByArticleResult;
      refreshComments(articleId, commentsRes);
    };

    handleGetComments();
  }, [getCommentsByArticleResult]);

  useEffect(() => {
    const handleThumbsUp = () => {
      const { isSuccess, isLoading } = thumbsUpArticleResult;
      if (!isSuccess || isLoading) return;
      if (!articleId) return;
      getThumbsUpByArticleId(articleId);
    };

    handleThumbsUp();
  }, [thumbsUpArticleResult]);

  useEffect(() => {
    const handleReceiveThumbsUp = () => {
      const { isSuccess, isFetching, data: thumbsUpResult } = getThumbsUpByArticleIdResult;
      if (!isSuccess || isFetching) return;
      if (!thumbsUpResult || !articleId) return;
      const { article_likes: thumbsUpData } = thumbsUpResult;
      refreshThumbsUp(articleId, thumbsUpData);
    };

    handleReceiveThumbsUp();
  }, [getThumbsUpByArticleIdResult]);

  useEffect(() => {
    const handleDeleteArticle = () => {
      const { isSuccess, isLoading } = deleteArticleResult;
      if (!isSuccess || isLoading) return;
      toast.success('刪除文章');
      onDeleteArticle(articleId!);
    };

    handleDeleteArticle();
  }, [deleteArticleResult]);

  return (
    <li>
      <ArticleCard>
        <Header>
          <UserPhoto
            src={author?.avatar_url || `${process.env.PUBLIC_URL}/images/avatar.png`}
            onError={({ currentTarget }) => { currentTarget.src = `${process.env.PUBLIC_URL}/images/avatar.png`; }}
            alt={author?.name}
            onClick={() => navigate(`/${author?.uid}`)}
          />
          <div>
            <Link to={`/${author?.uid}`}>{author?.name}</Link>
            <ArticleTime>{dayjs((publishedAt || 0) * 1000).format('YYYY/MM/DD HH:mm:ss')}</ArticleTime>
          </div>
          <MoreBtnContainer
            onMouseEnter={() => setIsMoreListShow(true)}
            onMouseLeave={() => setIsMoreListShow(false)}
          >
            {isMoreListShow && (
            <ArticleMoreList>
              {
                paramsUid === profile.uid && (
                <li>
                  <button className="delete-article-btn" onClick={() => deleteArticleTrigger(articleId!)} type="button">刪除</button>
                </li>
                )
              }
              <li>
                <button type="button">檢舉</button>
              </li>
            </ArticleMoreList>
            )}
            <MoreBtn className="more-btn" type="button">
              <span className="material-icons-outlined more-horiz-icon">more_horiz</span>
            </MoreBtn>
          </MoreBtnContainer>
        </Header>
        <Content ref={contentRef} />
        {
          sale && (
          <SalesDetail>
            <SalesMain>
              <span>$10</span> <span>新北市</span>
              <h3>貓沙組</h3>
            </SalesMain>
            <SendMsgBtn type="button" anime>
              <span className="material-icons-outlined">email</span>
              傳送訊息
            </SendMsgBtn>
          </SalesDetail>
          )
        }
        <Footer>
          <ThumbsUpBtnContainer onMouseLeave={() => setIsThumbsUpUserShow(false)}>
            {
              thumbsUp?.length ? (
                <ThumbsUpUsersContainer show={isThumbsUpUserShow}>
                  {
                thumbsUp?.map((thumbsUpItem) => (
                  <ThumbsUpUser key={thumbsUpItem.id} className="thumbs-up-user">
                    <Link to={`/${thumbsUpItem.author!.uid}`}>
                      <img
                        src={thumbsUpItem.author?.avatar_url || `${process.env.PUBLIC_URL}/images/avatar.png`}
                        onError={({ currentTarget }) => { currentTarget.src = `${process.env.PUBLIC_URL}/images/avatar.png`; }}
                        alt={`user ${thumbsUpItem.author?.name}`}
                      />
                    </Link>
                  </ThumbsUpUser>
                ))
              }
                </ThumbsUpUsersContainer>
              ) : ''
            }
            <FooterBtn
              type="button"
              anime
              active={thumbsUp?.some((thumbsUpItem) => thumbsUpItem.author?.uid === profile.uid)}
              onClick={() => thumbsUpArticleTrigger({ articleId })}
              onMouseEnter={() => setIsThumbsUpUserShow(true)}
            >
              <span className="interact-num">{thumbsUp?.length || 0}</span>
              <span className="material-icons-outlined thumbs-up-icon">thumb_up</span>
              <span className="material-icons thumbs-up-icon">thumb_up</span>
            </FooterBtn>
          </ThumbsUpBtnContainer>
          <FooterBtn type="button" anime>
            <span className="interact-num">{comments?.length}</span>
            <span className="material-icons-outlined">chat</span>
          </FooterBtn>
          <FooterBtn type="button" anime>
            <span className="interact-num">0</span>
            <span className="material-icons-outlined">share</span>
          </FooterBtn>
        </Footer>
        {
          comments?.length ? (
            <CommentListContainer>
              <CommentList>
                { comments.map((comment) => (<Comment key={comment.id} comment={comment} />))}
              </CommentList>
            </CommentListContainer>
          ) : ''
        }
        <InputSection>
          <img
            src={profile.avatar_url || `${process.env.PUBLIC_URL}/images/avatar.png`}
            onError={({ currentTarget }) => { currentTarget.src = `${process.env.PUBLIC_URL}/images/avatar.png`; }}
            alt={profile.name}
          />
          <input
            type="text"
            value={commentInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommentInput(e.target.value)}
          />
          <PostCommentBtn type="button" anime onClick={() => postComment()}>送出</PostCommentBtn>
        </InputSection>
      </ArticleCard>
    </li>
  );
};

Article.defaultProps = {
  sale: false,
  data: {},
};

export default Article;
