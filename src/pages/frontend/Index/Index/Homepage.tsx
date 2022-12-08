import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import Stories from 'pages/frontend/Index/components/Stories';
import Btn, { MoreBtn } from 'components/Btn';
import CardTitle from 'components/CardTitle';
import PublishPanel from 'components/PublishPanel';
import { useGetPersonalPageArticleQuery, useLazyGetPersonalPageArticleQuery } from 'services/article';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getArticles, refreshComments, refreshThumbsUp } from 'slices/articlesSlice';
import Article from 'pages/frontend/Index/components/Article';
import convertArticleStrToObject from 'utils/convertArticleStrToObject';
import Friend from 'pages/frontend/Index/components/Friend';
import Events from 'pages/frontend/Index/components/Events';
import Follow from 'pages/frontend/Index/components/Follow';
import PrivateRoute from 'context/PrivateRoute';
import Card from 'components/Card';
import { Link } from 'react-router-dom';
import { useLoginTestAccountMutation } from 'services/account';
import { useLazyGetUserByTokenQuery } from 'services/user';
import { getProfile } from 'slices/userInfoSlice';
import Cookies from 'js-cookie';
import useChatrooms from 'hooks/useChatrooms';

const Wrap = styled.div<IThemeProps>`
  display: flex;
  background-color: ${({ theme }) => theme.bgColor};
`;

const Contact = styled.div`
  width: 100%;
  max-width: 274px;
`;

const ContactHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FriendList = styled.ul<IThemeProps>`
  list-style: none;
  margin: 10px 0 20px;
`;

const MainContent = styled.main`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const ArticlesSection = styled.div`
  max-width: 800px;
  width: 100%;
  min-width: 380px;
  margin: 0 30px;
`;

const ArticleList = styled.ul`
  list-style: none;
  margin-bottom: 0;
  li {
    margin-bottom: 20px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

const StoriesSection = styled.div`
  flex-shrink: 0;
  width: 360px;
`;

const SendMessageBtn = styled(Btn)<IThemeProps>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white_100};
  border-radius: 5px;
  padding: 5px;
  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.8);
  }
`;

const NoLoggingContainer = styled.div<IThemeProps>`
  height: calc(100vh - 142px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoLoggingCard = styled(Card)`
  padding: 0;
  margin-right: 100px;
  a {
    text-decoration: none;
  }
  button, a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 120px;
    cursor: pointer;
    color: ${({ theme }) => theme.color.black_100};
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
  }
  &:last-of-type {
    margin-right: 0;
  }
`;

const Homepage: React.FC = () => {
  const dispatch = useAppDispatch();
  const friends = useAppSelector((state) => state.friends.friends);
  const articles = useAppSelector((state) => state.articles.articles);
  const { openMsgWindow } = useChatrooms();
  const {
    isSuccess: isGetArticlesSuccess,
    data: articlesResult,
  } = useGetPersonalPageArticleQuery();
  const [getPersonalPageArticleTrigger, articlesLazyResult] = useLazyGetPersonalPageArticleQuery();

  const refreshThumbsUpData = (articleId: string, thumbsUp: IThumbsUp[]) => {
    dispatch(refreshThumbsUp({ articleId, article_likes: thumbsUp }));
  };

  const refreshCommentsData = (articleId: string, comments: IComment[]) => {
    dispatch(refreshComments({ articleId, comments }));
  };

  const updateArticle = (articleId: string) => {
    const tempArticles = [...articles];
    const index = articles.findIndex((article) => article.id === articleId);
    tempArticles.splice(index, 1);
    dispatch(getArticles(tempArticles));
  };

  useEffect(() => {
    const handleFetchArticle = () => {
      if (!isGetArticlesSuccess) return;
      let { articles: articlesData } = articlesResult;
      articlesData = convertArticleStrToObject(articlesData);
      articlesData = [...articlesData]?.sort((a, b) => b.created_at! - a.created_at!);
      dispatch(getArticles(articlesData));
    };

    handleFetchArticle();
  }, [isGetArticlesSuccess]);

  useEffect(() => {
    const handleLazyFetchArticle = () => {
      const { isSuccess } = articlesLazyResult;
      if (!isSuccess) return;
      let { articles: articlesData } = articlesLazyResult.data;
      articlesData = [...articlesData]?.sort((a, b) => b.created_at! - a.created_at!);
      articlesData = convertArticleStrToObject(articlesData);
      dispatch(getArticles(articlesData));
    };

    handleLazyFetchArticle();
  }, [articlesLazyResult.isSuccess]);

  return (
    <Wrap>
      <Contact>
        <ContactHeader>
          <CardTitle>朋友</CardTitle>
          <MoreBtn type="button" anime>
            <span className="material-icons-outlined more-horiz-icon">more_horiz</span>
          </MoreBtn>
        </ContactHeader>
        <FriendList>
          {
            friends.connected.map((friend) => (
              <Friend
                key={friend.uid}
                friend={friend}
                length={friends.connected.length}
              >
                <SendMessageBtn
                  type="button"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    openMsgWindow(friend.uid!);
                  }}
                >
                  <span className="material-icons-outlined">sms</span>
                </SendMessageBtn>
              </Friend>
            ))
          }
        </FriendList>
      </Contact>
      <MainContent>
        <ArticlesSection>
          <PublishPanel onPublished={getPersonalPageArticleTrigger} />
          <ArticleList>
            {articles?.map((
              article,
            ) => (
              <Article
                key={article.id}
                data={article}
                refreshThumbsUp={refreshThumbsUpData}
                refreshComments={refreshCommentsData}
                onDeleteArticle={updateArticle}
              />
            ))}
          </ArticleList>
        </ArticlesSection>
      </MainContent>
      <StoriesSection>
        <Stories />
        <Events />
        <Follow />
      </StoriesSection>
    </Wrap>
  );
};

const WrapHomepage: React.FC = () => {
  const userInfo = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  const [loginTestAccountTrigger, loginTestAccountResult] = useLoginTestAccountMutation();
  const [getUserByTokenTrigger, userResult] = useLazyGetUserByTokenQuery();

  useEffect(() => {
    const handleLoginTestAccountApi = () => {
      if (!loginTestAccountResult.isSuccess) return;
      const { data: { token } } = loginTestAccountResult;
      Cookies.set('Friendsbook', token, { expires: 7 });
      getUserByTokenTrigger();
    };

    handleLoginTestAccountApi();
  }, [loginTestAccountResult.isSuccess]);

  useEffect(() => {
    const handleGetProfileApi = () => {
      const { isSuccess, isFetching } = userResult;
      if (!isSuccess || isFetching) return;
      dispatch(getProfile(userResult.data.profile));
    };

    handleGetProfileApi();
  }, [userResult]);

  return (
    <>
      {!userInfo.isLogin && (
        <NoLoggingContainer>
          <NoLoggingCard>
            <Btn type="button" onClick={() => loginTestAccountTrigger()}>
              一鍵登入測試用戶
            </Btn>
          </NoLoggingCard>
          <NoLoggingCard>
            <Link to="/login">
              註冊頁面
            </Link>
          </NoLoggingCard>
          <NoLoggingCard>
            <Link to="/home">
              介紹頁面
            </Link>
          </NoLoggingCard>
        </NoLoggingContainer>
      )}
      <PrivateRoute>
        <Homepage />
      </PrivateRoute>
    </>
  );
};

export default WrapHomepage;
