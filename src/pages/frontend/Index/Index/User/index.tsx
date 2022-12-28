import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Card from 'components/Card';
import { useParams, useOutletContext } from 'react-router-dom';
import { useUploadImgMutation } from 'services/image';
import { useLazyGetArticlesByUidQuery } from 'services/article';
import convertArticleStrToObject from 'utils/convertArticleStrToObject';
import { useAppSelector } from 'hooks';
import Article from 'pages/frontend/Index/components/Article';
import ArticleSkeleton from 'pages/frontend/Index/components/ArticleSkeleton';
import ImageList from 'pages/frontend/Index/components/ImageList';

const Wrap = styled.div`
  display: flex;
`;

const Aside = styled.aside`
  flex-shrink: 0;
  width: 450px;
  margin-right: 20px;
`;

const AsideContent = styled.div`
  position: sticky;
  top: 100px;
`;

const UserPageCard = styled(Card)<IThemeProps>`
  margin-bottom: 20px;
  .title {
    font-weight: 700; 
    font-size: ${({ theme }) => theme.fontSizes.fs_2};
    color: ${({ theme }) => theme.color.blue_300};
    margin-bottom: 10px;
  }
`;

const ArticleList = styled.ul`
  flex-grow: 1;
  list-style: none;
  margin: 0;
  .empty-box {
    width: 50px;
    height: 50px;
    border-radius: 3px;
  }
  li {
    margin-bottom: 20px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

const UserIndex: React.FC = () => {
  const { uid: paramUid } = useParams();
  const profile = useAppSelector((state) => state.userInfo.profile);
  const { imgs, refreshImages, getImagesResult }: IOutletContext = useOutletContext();
  const [getArticlesByUidTrigger, getArticlesByUidResult] = useLazyGetArticlesByUidQuery();
  const [uploadImgTrigger, uploadImgResult] = useUploadImgMutation();
  const [articles, setArticles] = useState<IArticle[]>([]);

  const refreshThumbsUpData = (articleId: string, thumbsUpData: IThumbsUp[]) => {
    const index = articles.findIndex((article) => article.id === articleId);
    setArticles((prev) => {
      const tempArticles = [...prev];
      tempArticles[index].article_likes = thumbsUpData;
      return tempArticles;
    });
  };

  const refreshCommentsData = (articleId: string, comments: IComment[]) => {
    setArticles((prev) => {
      const tempArticles = [...prev];
      const index = tempArticles.findIndex((article) => article.id === articleId);
      tempArticles[index].comments = comments;
      return tempArticles;
    });
  };

  const updateArticle = (articleId: string) => {
    setArticles((prev) => {
      const temp = [...prev];
      const index = prev.findIndex((article) => article.id === articleId);
      temp.splice(index, 1);
      return temp;
    });
  };

  const handleUploadImg = (formData: FormData) => {
    uploadImgTrigger(formData);
  };

  useEffect(() => {
    if (uploadImgResult.isSuccess) refreshImages();
  }, [uploadImgResult]);

  useEffect(() => {
    if (paramUid) {
      getArticlesByUidTrigger(paramUid);
    }
  }, [paramUid]);

  useEffect(() => {
    const handleGetArticlesApi = () => {
      const { isSuccess, data } = getArticlesByUidResult;
      if (!isSuccess) return;
      const articlesSortTime = [...data.articles].sort((a, b) => b.created_at! - a.created_at!);
      setArticles(convertArticleStrToObject(articlesSortTime));
    };

    handleGetArticlesApi();
  }, [getArticlesByUidResult]);

  return (
    <Wrap>
      <Aside>
        <AsideContent>
          <UserPageCard>
            {/* // TODO: skeleton */}
            <h4 className="title">簡介</h4>
            <p>偶像偶像偶像偶像偶像偶像偶像偶像偶像偶像偶像偶像</p>
          </UserPageCard>
          <UserPageCard>
            <h4 className="title">相片</h4>
            <ImageList
              images={imgs}
              cols={3}
              height="130px"
              isFetching={getImagesResult.isFetching}
              isSuccess={getImagesResult.isSuccess}
              isUploadShow={paramUid === profile.uid}
              handleUpload={handleUploadImg}
            />
          </UserPageCard>
        </AsideContent>
      </Aside>
      <ArticleList>
        {getArticlesByUidResult.isFetching ? <ArticleSkeleton />
          : articles?.map((article) => (
            <Article
              key={article.id}
              data={article}
              refreshThumbsUp={refreshThumbsUpData}
              refreshComments={refreshCommentsData}
              onDeleteArticle={updateArticle}
            />
          )) }
      </ArticleList>
    </Wrap>
  );
};

export default UserIndex;
