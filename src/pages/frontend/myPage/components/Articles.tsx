import React from 'react';
import Article from 'pages/frontend/MyPage/components/Article';
import styled from '@emotion/styled';
import { useAppSelector } from 'hooks';

const ArticleList = styled.ul`
  list-style: none;
`;

interface IArticlesProps {
  sale?: boolean;
}

const Articles: React.FC<IArticlesProps> = ({ sale }) => {
  const articles = useAppSelector((state) => state.articles.articles);

  return (
    <ArticleList>
      {articles?.map((article) => <Article key={article.id} sale={sale} data={article} />)}
    </ArticleList>
  );
};

Articles.defaultProps = {
  sale: false,
};

export default Articles;
