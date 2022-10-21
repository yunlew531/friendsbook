import React from 'react';
import Article from 'pages/frontend/myPage/components/Article';
import styled from '@emotion/styled';

const ArticleList = styled.ul`
  list-style: none;
`;

// eslint-disable-next-line arrow-body-style
const Articles: React.FC = () => {
  return (
    <ArticleList>
      <Article />
    </ArticleList>
  );
};

export default Articles;
