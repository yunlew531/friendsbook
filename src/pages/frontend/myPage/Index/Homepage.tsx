import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import Stories from 'pages/frontend/MyPage/components/Stories';
import { MoreBtn } from 'components/Btn';
import CardTitle from 'components/CardTitle';
import PublishPanel from 'components/PublishPanel';
import { useGetPersonalPageArticleQuery, useLazyGetPersonalPageArticleQuery } from 'services/article';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getArticles, refreshComments, refreshThumbsUp } from 'slices/articlesSlice';
import { getFriends } from 'slices/friendsSlice';
import { useGetFriendsQuery } from 'services/friend';
import handleIsOnline from 'utils/handleIsOnline';
import Article from 'pages/frontend/MyPage/components/Article';
import dayjs from 'utils/dayjs';
import convertArticleStrToObject from 'utils/convertArticleStrToObject';
import { useNavigate } from 'react-router-dom';
import Events from '../components/Events';
import Follow from '../components/Follow';

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
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.color.gray_400};
  margin: 10px 0 20px;
`;

const FriendItem = styled.li<IThemeProps>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.cardColor};  
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_400};
  padding: 11px 23px;
  .link-name {
    font-weight: 700;
    color: ${({ theme }) => theme.color.gray_500};
  }
  &:first-of-type {
    border-radius: 8px 8px 0 0;
  }
  &:last-of-type {
    border-radius: 0 0 8px 8px;
    border-bottom: none;
  }
  &:hover {
    filter: brightness(0.95);
  }
  &:active {
    filter: brightness(0.9);
  }
`;

const FriendItemPhoto = styled.div<IThemeProps & { online: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 2px solid ${({ online, theme: { color: { green_100 } } }) => (online ? green_100 : 'transparent')};
  overflow: hidden;
  margin-right: 15px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: 1px solid ${({ theme }) => theme.color.white_100};
  }
`;

const FriendItemMain = styled.div<IThemeProps>`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.fs_4};
  color: ${({ theme }) => theme.color.gray_500};
  cursor: default;
  .last-seen {
    text-align: center;
    line-height: 1.3;
    color: ${({ theme }) => theme.color.gray_300};
    font-size: ${({ theme }) => theme.fontSizes.fs_5};
  }
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

const Homepage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const articles = useAppSelector((state) => state.articles.articles);
  const {
    isSuccess: isGetArticlesSuccess,
    data: articlesResult,
  } = useGetPersonalPageArticleQuery();
  const [getPersonalPageArticleTrigger, articlesLazyResult] = useLazyGetPersonalPageArticleQuery();
  const { data: FriendsResult, isSuccess: isGetFriendsSuccess } = useGetFriendsQuery();

  const refreshThumbsUpData = (articleId: string, thumbsUp: IThumbsUp[]) => {
    dispatch(refreshThumbsUp({ articleId, thumbs_up: thumbsUp }));
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
            FriendsResult?.friends?.map((friend) => (
              <FriendItem key={friend.uid} onClick={() => navigate(`/${friend.uid}`)}>
                <FriendItemPhoto online={handleIsOnline(friend.last_seen)}>
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt={`user ${friend.name}`}
                  />
                </FriendItemPhoto>
                <FriendItemMain>
                  <p className="link-name">{friend.nickname || friend.name}</p>
                  {friend.last_seen && (
                  <p className="last-seen">最後上線<br />
                    {dayjs(friend.last_seen * 1000).fromNow()}
                  </p>
                  )}
                </FriendItemMain>
              </FriendItem>
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
