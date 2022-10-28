import React from 'react';
import Articles from 'pages/frontend/MyPage/components/Articles';
import styled from '@emotion/styled';
import Card from 'components/Card';
import Btn from 'components/Btn';

const PublishProductPanel = styled(Card)`
  display: flex;
  align-items: center;
`;

const UserPhoto = styled.img<IThemeProps>`
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 1px solid ${({ theme }) => theme.color.secondary};
  padding: 2px;
  margin-right: 30px;
`;

const PublishProductBtn = styled(Btn)<IThemeProps>`
  width: 100%;
  color: ${({ theme }) => theme.color.white_100};
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.fs_4};
  background-color: ${({ theme }) => theme.color.secondary};
  border-radius: 8px;
  padding: 10px;
  transition: filter .1s ease-in-out;
  &:hover {
    filter: brightness(0.97);
  }
  &:active {
    filter: brightness(0.9);
  }
`;

// eslint-disable-next-line arrow-body-style
const ClubSales: React.FC = () => {
  return (
    <>
      <PublishProductPanel>
        <UserPhoto src="https://images.unsplash.com/photo-1624530460643-b0aa24cc02b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="people" />
        <PublishProductBtn type="button">發佈商品</PublishProductBtn>
      </PublishProductPanel>
      <Articles sale />
    </>
  );
};

export default ClubSales;
