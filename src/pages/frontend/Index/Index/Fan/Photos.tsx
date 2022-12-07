import React from 'react';
import Card from 'components/Card';
import styled from '@emotion/styled';

const Title = styled.h2<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.fs_2};
  margin-bottom: 10px;
`;

const PhotoList = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  list-style: none;
  margin: 0;
`;

const PhotoItem = styled.li`
  line-height: 0;
  img {
    height: 150px;
    border-radius: 5px;
  }
`;

// eslint-disable-next-line arrow-body-style
const FanPhotos: React.FC = () => {
  return (
    <Card>
      <Title>相片</Title>
      <PhotoList>
        {
          new Array(29).fill(null).map((item, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <PhotoItem key={idx}>
              <img src="https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=601&q=80" alt="" />
            </PhotoItem>
          ))
        }
      </PhotoList>
    </Card>
  );
};

export default FanPhotos;
