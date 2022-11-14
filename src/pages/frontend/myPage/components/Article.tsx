import React, { useEffect, useRef, useState } from 'react';
import Card from 'components/Card';
import styled from '@emotion/styled';
import Btn from 'components/Btn';
import dayjs from 'dayjs';
import quillDeltaToHtml from 'utils/quillDeltaToHtml';
import { useLazyGetCommentsByArticleIdQuery, usePostCommentMutation } from 'services/article';
import { useAppDispatch } from 'hooks';
import { refreshComments } from 'slices/articlesSlice';

const ArticleCard = styled(Card)<IThemeProps>`
  box-shadow: ${({ theme }) => theme.shadow.s};
  border-left: none;
  border-bottom: none;
  padding: 20px 0 0;
  margin-bottom: 20px;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 0 20px;
`;

const UserPhoto = styled.img<IThemeProps>`
  width: 55px;
  height: 55px;
  box-shadow: ${({ theme }) => theme.shadow.m};
  border-radius: 100%;
  padding: 2px;
  margin-right: 18px;
  border-radius: 100%;
`;

const HeaderName = styled.p<IThemeProps>`
  font-weight: 700;
  color: ${({ theme }) => theme.color.blue_300};
  margin-bottom: 3px;
`;

const ArticleTime = styled.p<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.fs_5};
  color: ${({ theme }) => theme.color.gray_500};
`;

const MoreBtn = styled.button<IThemeProps>`
  align-self: flex-start;
  display: flex;
  align-items: center;
  border: none;
  background-color: ${({ theme }) => theme.color.white_100};
  border-radius: 8px;
  transition: filter .1s ease-in-out, transform .1s ease-in-out;
  margin-left: auto;
  padding: 1px 6px;
  .more-horiz-icon {
    color: ${({ theme }) => theme.color.gray_300};
  }
  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    transform: scale(0.95);
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

const FooterBtn = styled(Btn)<IThemeProps>`
  position: relative;
  color: ${({ theme }) => theme.color.gray_300};
  margin: 0 6px;
  .material-icons-outlined {
    transition: transform .1s ease-in-out;
    font-size: ${({ theme }) => theme.fontSizes.fs_1};
  }
  .interact-num {
    position: absolute;
    top: -5px;
    right: -3px;
  }
  &:hover {
    .material-icons-outlined {
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

const CommentItem = styled.li<IThemeProps>`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_400};
  padding-bottom: 5px;
  &:last-of-type {
    margin-bottom: 0;
    border-bottom: none;
  }
`;

const CommentUserPhoto = styled.img<IThemeProps>`
  align-self: flex-start;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 2px solid ${({ theme }) => theme.color.white_100};
  margin-right: 10px;
  border-radius: 100%;
`;

const CommentMain = styled.div`
  flex-grow: 1;
  
`;

const CommentMainHeader = styled.div`
  display: flex;
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
  
`;

const CommentMoreBtn = styled(Btn)<IThemeProps>`
  padding: 5px 2px;
  border-radius: 3px;
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
}

const Article: React.FC<IArticleProps> = ({ sale, data }) => {
  const {
    author, created_at: publishedAt, content, comments, id: articleId,
  } = data || {};
  const [postCommentTrigger, postCommentResult] = usePostCommentMutation();
  const [
    getCommentsByArticleIdTrigger, getCommentsByArticleResult,
  ] = useLazyGetCommentsByArticleIdQuery();
  const dispatch = useAppDispatch();
  const contentRef = useRef<HTMLDivElement>(null);
  const [commentInput, setCommentInput] = useState('');

  const postComment = () => {
    if (!articleId) return;
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
    const handleComments = () => {
      if (!articleId) return;
      const { data: { comments: commentsRes } } = getCommentsByArticleResult;
      dispatch(refreshComments({ articleId, comments: commentsRes }));
    };

    if (getCommentsByArticleResult.isSuccess) handleComments();
  }, [getCommentsByArticleResult]);

  return (
    <li>
      <ArticleCard>
        <Header>
          <UserPhoto src="https://images.unsplash.com/photo-1622347379811-aa09b950bd5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" />
          <div>
            <HeaderName>{author?.name}</HeaderName>
            <ArticleTime>{dayjs((publishedAt || 0) * 1000).format('YYYY/MM/DD HH:mm:ss')}</ArticleTime>
          </div>
          <MoreBtn type="button">
            <span className="material-icons-outlined more-horiz-icon">more_horiz</span>
          </MoreBtn>
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
          <FooterBtn type="button" anime>
            <span className="interact-num">0</span>
            <span className="material-icons-outlined">thumb_up</span>
          </FooterBtn>
          <FooterBtn type="button" anime>
            <span className="interact-num">{comments?.length}</span>
            <span className="material-icons-outlined">chat</span>
          </FooterBtn>
          <FooterBtn type="button" anime>
            <span className="interact-num">0</span>
            <span className="material-icons-outlined">share</span>
          </FooterBtn>
        </Footer>
        <InputSection>
          <img src="https://images.unsplash.com/photo-1622347379811-aa09b950bd5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt="user portrait" />
          <input
            type="text"
            value={commentInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommentInput(e.target.value)}
          />
          <PostCommentBtn type="button" anime onClick={() => postComment()}>送出</PostCommentBtn>
        </InputSection>
        {
          comments?.length ? (
            <CommentListContainer>
              <CommentList>
                {
              comments.map((comment) => (
                <CommentItem key={comment.id}>
                  <CommentUserPhoto src="https://images.unsplash.com/photo-1622347379811-aa09b950bd5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" />
                  <CommentMain>
                    <CommentMainHeader>
                      <CommentUsername>{comment.author?.name}</CommentUsername>
                      <CommentContent>{comment.content}</CommentContent>
                    </CommentMainHeader>
                    <CommentMainFooter>
                      <CommentTime>{dayjs((comment.created_at || 0) * 1000).format('YYYY/MM/DD HH:mm:ss')}</CommentTime>
                      <CommentFooterBtn type="button" anime>
                        <span className="material-icons-outlined">thumb_up</span>
                      </CommentFooterBtn>
                      <CommentFooterBtn type="button" anime>
                        <span className="material-icons-outlined">reply</span>
                      </CommentFooterBtn>
                    </CommentMainFooter>
                  </CommentMain>
                  <CommentMoreBtn type="button">
                    <span className="material-icons-outlined more-icon">more_vert</span>
                  </CommentMoreBtn>
                </CommentItem>
              ))
            }
              </CommentList>
            </CommentListContainer>
          ) : ''
        }
      </ArticleCard>
    </li>
  );
};

Article.defaultProps = {
  sale: false,
  data: {},
};

export default Article;
