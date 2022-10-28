import React from 'react';
import Article from 'pages/frontend/MyPage/components/Article';
import styled from '@emotion/styled';

const ArticleList = styled.ul`
  list-style: none;
`;

interface IArticlesProps {
  sale?: boolean;
}

// eslint-disable-next-line arrow-body-style
const Articles: React.FC<IArticlesProps> = ({ sale }) => {
  return (
    <ArticleList>
      {
        // eslint-disable-next-line react/no-array-index-key
      new Array(10).fill(null).map((item, idx) => <Article sale={sale} key={idx} />)
}
    </ArticleList>
  );
};

Articles.defaultProps = {
  sale: false,
};

export default Articles;
