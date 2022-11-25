import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import Stories from 'pages/frontend/MyPage/components/Stories';
import Btn, { MoreBtn } from 'components/Btn';
import CardTitle from 'components/CardTitle';
import PublishPanel from 'components/PublishPanel';
import { useGetPersonalPageArticleQuery, useLazyGetPersonalPageArticleQuery } from 'services/article';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getArticles, refreshComments, refreshThumbsUp } from 'slices/articlesSlice';
import { getFriends } from 'slices/friendsSlice';
import { useGetFriendsByTokenQuery } from 'services/friend';
import Article from 'pages/frontend/MyPage/components/Article';
import convertArticleStrToObject from 'utils/convertArticleStrToObject';
import Friend from 'pages/frontend/MyPage/components/Friend';
import Events from 'pages/frontend/MyPage/components/Events';
import Follow from 'pages/frontend/MyPage/components/Follow';

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

const Homepage: React.FC = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.articles.articles);
  const {
    isSuccess: isGetArticlesSuccess,
    data: articlesResult,
  } = useGetPersonalPageArticleQuery();
  const [getPersonalPageArticleTrigger, articlesLazyResult] = useLazyGetPersonalPageArticleQuery();
  const { data: FriendsResult, isSuccess: isGetFriendsSuccess } = useGetFriendsByTokenQuery();

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
      if (!articlesResult) return;
      let { articles: articlesData } = articlesResult;
      articlesData = convertArticleStrToObject(articlesData);
      articlesData = [...articlesData]?.sort((a, b) => b.created_at! - a.created_at!);
      dispatch(getArticles(articlesData));
    };

    handleFetchArticle();
  }, [isGetArticlesSuccess]);

  useEffect(() => {
    const handleLazyFetchArticle = () => {
      const { isSuccess, isFetching } = articlesLazyResult;
      if (!isSuccess || isFetching) return;
      let { articles: articlesData } = articlesLazyResult.data;
      articlesData = [...articlesData]?.sort((a, b) => b.created_at! - a.created_at!);
      articlesData = convertArticleStrToObject(articlesData);
      dispatch(getArticles(articlesData));
    };

    handleLazyFetchArticle();
  }, [articlesLazyResult]);

  useEffect(() => {
    const handleGetFriendsApi = () => {
      if (!FriendsResult) return;
      dispatch(getFriends(FriendsResult.friends));
    };

    handleGetFriendsApi();
  }, [isGetFriendsSuccess]);

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
            FriendsResult?.friends.connected.map((friend) => (
              <Friend
                key={friend.uid}
                friend={friend}
                length={FriendsResult?.friends.connected.length}
              >
                <SendMessageBtn
                  type="button"
                  onClick={(e) => { e.stopPropagation(); }}
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

export default Homepage;
