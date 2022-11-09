import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import ArticleList from 'pages/frontend/MyPage/components/Articles';
import Stories from 'pages/frontend/MyPage/components/Stories';
import { MoreBtn } from 'components/Btn';
import CardTitle from 'components/CardTitle';
import PublishPanel from 'components/PublishPanel';
import { useGetPersonalPageArticleQuery, useLazyGetPersonalPageArticleQuery } from 'services/article';
import { useAppDispatch } from 'hooks';
import { getArticles } from 'slices/articlesSlice';
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
  border: 1px solid ${({ theme }) => theme.color.gray_400};
  margin-top: 15px;
`;

const FriendItem = styled.li<IThemeProps>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.cardColor};  
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_400};
  padding: 11px 23px;
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

const FriendItemContent = styled.p<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.fs_4};
  color: ${({ theme }) => theme.color.gray_500};
  cursor: default;
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

const StoriesSection = styled.div`
  flex-shrink: 0;
  width: 360px;
`;

const Homepage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isSuccess, data: articlesResult } = useGetPersonalPageArticleQuery();
  const [getPersonalPageArticleTrigger, articlesLazyResult] = useLazyGetPersonalPageArticleQuery();

  useEffect(() => {
    const handleFetchArticle = () => {
      if (!isSuccess) return;
      let { articles } = articlesResult;
      articles = [...articles]?.sort((a, b) => b.published_at! - a.published_at!);
      dispatch(getArticles(articles));
    };

    handleFetchArticle();
  }, [isSuccess]);

  useEffect(() => {
    const handleLazyFetchArticle = () => {
      if (articlesLazyResult.isSuccess) {
        let { articles } = articlesLazyResult.data;
        articles = [...articles]?.sort((a, b) => b.published_at! - a.published_at!);
        dispatch(getArticles(articles));
      }
    };

    if (!articlesLazyResult.isUninitialized) handleLazyFetchArticle();
  }, [articlesLazyResult]);

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
            new Array(30).fill(null).map((item, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <FriendItem key={idx}>
                <FriendItemPhoto online={idx !== 3}>
                  {/* TODO: change alt */}
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="friend"
                  />
                </FriendItemPhoto>
                <FriendItemContent>Bradyn Kramer</FriendItemContent>
              </FriendItem>
            ))
          }
        </FriendList>
      </Contact>
      <MainContent>
        <ArticlesSection>
          <PublishPanel onPublished={getPersonalPageArticleTrigger} />
          <ArticleList />
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
