import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Card from 'components/Card';
import { useParams } from 'react-router-dom';
import { useLazyGetImgByUidQuery } from 'services/image';
import { useLazyGetArticlesByUidQuery } from 'services/article';
import convertArticleStrToObject from 'utils/convertArticleStrToObject';
import { useAppSelector } from 'hooks';
import Article from '../../components/Article';

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

const ImagesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
  list-style: none;
  img {
    height: 130px;
    border-radius: 3px;
  }
  .empty-box {
    grid-column-start: 1;
    grid-column-end: 4;
    text-align: center;
    img {
      margin: 30px 0;
      width: 50px;
      height: 50px;
      filter: grayscale(1);
    }
  }
`;

const UploadImgBtn = styled.button<IThemeProps>`
  position: relative;
  width: 100%;
  height: 130px;
  border: 1px dashed ${({ theme }) => theme.color.gray_100};
  border-radius: 3px;
  line-height: 0;
  transition: filter .1s ease-in-out;
  &:hover {
    filter: brightness(1.03);
  }
  &:active {
    filter: brightness(0.97);
  }
  input[type=file] {
    opacity: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
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
`;

// eslint-disable-next-line arrow-body-style
const FanIndex: React.FC = () => {
  const params = useParams();
  const paramUid = params.uid;
  const profile = useAppSelector((state) => state.userInfo.profile);
  const [getImgsTrigger, getImgsResult] = useLazyGetImgByUidQuery();
  const [getArticlesByUidTrigger, getArticlesByUidResult] = useLazyGetArticlesByUidQuery();
  const [imgs, setImgs] = useState<IImage[]>([]);
  const [articles, setArticles] = useState<IArticle[]>([]);

  const refreshThumbsUpData = (articleId: string, thumbsUpData: IThumbsUp[]) => {
    const index = articles.findIndex((article) => article.id === articleId);
    setArticles((prev) => {
      const tempArticles = [...prev];
      tempArticles[index].thumbs_up = thumbsUpData;
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

  useEffect(() => {
    if (paramUid) {
      getImgsTrigger(paramUid);
      getArticlesByUidTrigger(paramUid);
    }
  }, [paramUid]);

  useEffect(() => {
    const handleGetImgsApi = () => {
      const { isSuccess, isFetching } = getImgsResult;
      if (!isSuccess || isFetching) return;
      const { data } = getImgsResult;
      if (data) setImgs(data.images);
    };

    handleGetImgsApi();
  }, [getImgsResult]);

  useEffect(() => {
    const handleGetArticlesApi = () => {
      const { isSuccess, isFetching } = getArticlesByUidResult;
      if (!isSuccess || isFetching) return;
      const { data } = getArticlesByUidResult;
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
            <h4 className="title">簡介</h4>
            <p>偶像偶像偶像偶像偶像偶像偶像偶像偶像偶像偶像偶像</p>
          </UserPageCard>
          <UserPageCard>
            <h4 className="title">相片</h4>
            <ImagesList>
              {paramUid === profile.uid && (
                <li>
                  <UploadImgBtn type="button">
                    <span className="material-icons-outlined">add</span>
                    <input type="file" />
                  </UploadImgBtn>
                </li>
              )}
              {imgs?.map((img) => <li key={img.id}><img src={img.url} alt={img.url} /></li>)}
              {imgs.length ? '' : (
                <li className="empty-box">
                  <img src={`${process.env.PUBLIC_URL}/images/empty-box.png`} alt="empty box" />
                </li>
              )}
            </ImagesList>
          </UserPageCard>
        </AsideContent>
      </Aside>
      <ArticleList>
        {articles?.map((article) => (
          <Article
            key={article.id}
            data={article}
            refreshThumbsUp={refreshThumbsUpData}
            refreshComments={refreshCommentsData}
          />
        ))}
      </ArticleList>
    </Wrap>
  );
};

export default FanIndex;
