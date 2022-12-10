import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Card from 'components/Card';
import { useParams, useOutletContext } from 'react-router-dom';
import { useDeleteImgMutation, useLazyGetImgsByUidQuery } from 'services/image';
import { useLazyGetArticlesByUidQuery } from 'services/article';
import convertArticleStrToObject from 'utils/convertArticleStrToObject';
import { useAppSelector } from 'hooks';
import useFileUpload from 'hooks/useFileUpload';
import Article from 'pages/frontend/Index/components/Article';
import toast from 'react-hot-toast';
import ArticleSkeleton from 'pages/frontend/Index/components/ArticleSkeleton';
import Skeleton from 'react-loading-skeleton';

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
  gap: 5px;
  list-style: none;
  li {
    line-height: 0;
  }
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
  .img-skeleton {
    height: 130px;
    border-radius: 3px;
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
  li {
    margin-bottom: 20px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

interface IOutletContext {
  imgs: IImage[];
  setImgs: React.Dispatch<React.SetStateAction<IImage[]>>;
}

const FanIndex: React.FC = () => {
  const { uid: paramUid } = useParams();
  const profile = useAppSelector((state) => state.userInfo.profile);
  const { imgs, setImgs }: IOutletContext = useOutletContext();
  const inputRef = useRef(null);
  const { uploadImg, uploadImgResult } = useFileUpload(inputRef);
  const [getImgsTrigger, getImgsResult] = useLazyGetImgsByUidQuery();
  const [getArticlesByUidTrigger, getArticlesByUidResult] = useLazyGetArticlesByUidQuery();
  const [deleteImgTrigger, deleteImgResult] = useDeleteImgMutation();

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

  useEffect(() => {
    if (paramUid) {
      getImgsTrigger(paramUid);
      getArticlesByUidTrigger(paramUid);
    }
  }, [paramUid]);

  useEffect(() => {
    const handleGetImgsApi = () => {
      const { isSuccess } = getImgsResult;
      if (!isSuccess) return;
      const { data: { images } } = getImgsResult;
      const sortImagesByTime = [...images].sort((a, b) => b.created_at! - a.created_at!);
      setImgs(sortImagesByTime);
    };

    handleGetImgsApi();
  }, [getImgsResult]);

  useEffect(() => {
    const handleUploadImg = () => {
      const { isSuccess, isLoading } = uploadImgResult;
      if (!isSuccess || isLoading || !paramUid) return;
      getImgsTrigger(paramUid);
    };

    handleUploadImg();
  }, [uploadImgResult]);

  useEffect(() => {
    const handleGetArticlesApi = () => {
      const { isSuccess, data } = getArticlesByUidResult;
      if (!isSuccess) return;
      const articlesSortTime = [...data.articles].sort((a, b) => b.created_at! - a.created_at!);
      setArticles(convertArticleStrToObject(articlesSortTime));
    };

    handleGetArticlesApi();
  }, [getArticlesByUidResult]);

  useEffect(() => {
    const handleDeleteImg = () => {
      const { isSuccess, isLoading } = deleteImgResult;
      if (!isSuccess || isLoading) return;
      toast.success('已刪除');
      if (!profile.uid) return;
      getImgsTrigger(profile.uid);
    };

    handleDeleteImg();
  }, [deleteImgResult]);

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
            <ImagesList>
              {paramUid === profile.uid && (
                <li>
                  <UploadImgBtn type="button">
                    <span className="material-icons-outlined">add</span>
                    <input ref={inputRef} type="file" onChange={uploadImg} />
                  </UploadImgBtn>
                </li>
              )}
              {getImgsResult.isFetching ? (
                <>
                  <div><Skeleton className="img-skeleton" height={130} /></div>
                  <div><Skeleton className="img-skeleton" height={130} /></div>
                  <div><Skeleton className="img-skeleton" height={130} /></div>
                  <div><Skeleton className="img-skeleton" height={130} /></div>
                  <div><Skeleton className="img-skeleton" height={130} /></div>
                  <div><Skeleton className="img-skeleton" height={130} /></div>
                  <div><Skeleton className="img-skeleton" height={130} /></div>
                  <div><Skeleton className="img-skeleton" height={130} /></div>
                  <div><Skeleton className="img-skeleton" height={130} /></div>
                </>
              ) : imgs.map((img) => (
                <li key={img.id}><img src={img.url} alt={img.url} />
                  <button type="button" onClick={() => deleteImgTrigger(img.id)}>123</button>
                </li>
              )) }
              {profile.uid !== paramUid && getImgsResult.isSuccess && imgs?.length === 0
                && (
                <li className="empty-box">
                  <img src={`${process.env.PUBLIC_URL}/images/empty-box.png`} alt="empty box" />
                </li>
                )}
            </ImagesList>
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

export default FanIndex;
