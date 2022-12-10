import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import quillDeltaToHtml from 'utils/quillDeltaToHtml';
import {
  useLazyGetCommentsByArticleIdQuery, useThumbsUpArticleMutation, usePostCommentMutation,
  useLazyGetThumbsUpByArticleIdQuery, useDeleteArticleMutation,

} from 'services/article';
import { useAppSelector } from 'hooks';
import Comment from 'pages/frontend/Index/components/Comment';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArticleCard, ArticleHeader, UserPhoto, ArticleTime, MoreBtnContainer, ArticleMoreList, MoreBtn,
  ArticleContent, ArticleFooter, ThumbsUpBtnContainer, ThumbsUpUsersContainer, ThumbsUpUser,
  FooterBtn, CommentListContainer, CommentList, PostCommentBtn, SalesDetail, SalesMain, SendMsgBtn,
  InputSection,
} from 'components/StyleComponents';

interface IArticleProps {
  sale?: boolean;
  data?: IArticle;
  refreshThumbsUp?: (articleId: string, thumbsUp: IThumbsUp[]) => void;
  refreshComments?: (articleId: string, comments: IComment[]) => void;
  onDeleteArticle?: (articleId: string) => void;
}

const Article: React.FC<IArticleProps> = ({
  sale, data, refreshThumbsUp, refreshComments, onDeleteArticle,
}) => {
  const {
    author, created_at: publishedAt, content, comments, id: articleId, article_likes: thumbsUp,
  } = data || {};
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
      refreshComments!(articleId, commentsRes);
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
      const { isSuccess, data: thumbsUpResult } = getThumbsUpByArticleIdResult;
      if (!isSuccess) return;
      if (!thumbsUpResult || !articleId) return;
      const { article_likes: thumbsUpData } = thumbsUpResult;
      refreshThumbsUp!(articleId, thumbsUpData);
    };

    handleReceiveThumbsUp();
  }, [getThumbsUpByArticleIdResult]);

  useEffect(() => {
    const handleDeleteArticle = () => {
      const { isSuccess, isLoading } = deleteArticleResult;
      if (!isSuccess || isLoading) return;
      toast.success('刪除文章');
      onDeleteArticle!(articleId!);
    };

    handleDeleteArticle();
  }, [deleteArticleResult]);

  return (
    <li>
      <ArticleCard>
        <ArticleHeader>
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
                author?.uid === profile.uid && (
                <li>
                  <button className="delete-article-btn" onClick={() => deleteArticleTrigger(articleId!)} type="button">刪除</button>
                </li>
                )
              }
              {
                author?.uid !== profile.uid && (
                  <li>
                    <button type="button">檢舉</button>
                  </li>
                )
              }
            </ArticleMoreList>
            )}
            <MoreBtn className="more-btn" type="button">
              <span className="material-icons-outlined more-horiz-icon">more_horiz</span>
            </MoreBtn>
          </MoreBtnContainer>
        </ArticleHeader>
        <ArticleContent ref={contentRef} />
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
        <ArticleFooter>
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
        </ArticleFooter>
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
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
              const enters = ['Enter', 'NumpadEnter'];
              if (!enters.includes(e.code)) return;
              postComment();
            }}
          />
          <PostCommentBtn type="button" anime onClick={postComment}>送出</PostCommentBtn>
        </InputSection>
      </ArticleCard>
    </li>
  );
};

Article.defaultProps = {
  sale: false,
  data: {},
  refreshThumbsUp: undefined,
  refreshComments: undefined,
  onDeleteArticle: undefined,
};

export default Article;
