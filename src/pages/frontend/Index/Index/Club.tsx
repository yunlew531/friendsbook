import React from 'react';
import styled from '@emotion/styled';
import Btn from 'components/Btn';
import Card from 'components/Card';
import { Outlet } from 'react-router-dom';
import Navbar from 'components/Navbar';

const Wrap = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled(Card)<IThemeProps>`
  background-color: ${({ theme }) => theme.color.white_100};
  border-radius: 8px 8px 0 0;
  border-bottom: none;
  box-shadow: ${({ theme }) => theme.shadow.s};
`;

const BannerImg = styled.img<IThemeProps>`
  height: 300px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow.s};
  margin-bottom: 10px;
`;

const GroupTitle = styled.h2<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.s};
  color: ${({ theme }) => theme.color.black_100};
  margin-bottom: 3px;
`;

const GroupDesc = styled.p<IThemeProps>`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.fs_3};
  color: ${({ theme }) => theme.color.gray_500};
  .material-icons-round {
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
    margin-right: 3px;
  }
`;

const MembersQtyBtn = styled(Btn)<IThemeProps>`
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.fontSizes.fs_3};
  margin-top: 2px;
  &:hover {
    text-decoration: underline;
  }
`;

const Groups: React.FC = () => {
  const navLinks: INavLink[] = [
    {
      title: '買賣',
      to: '/club/:id',
    },
    {
      title: '貼文',
      to: '/club/:id/posts',
    },
    {
      title: '成員',
      to: '/club/:id/members',
    },
    {
      title: '相片',
      to: '/club/:id/photos',
    },
  ];

  return (
    <Wrap>
      <Header>
        <BannerImg src="https://images.unsplash.com/photo-1598589290625-9b04630ec5d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="group banner" />
        <GroupTitle>貓貓同好</GroupTitle>
        <GroupDesc>
          <span className="material-icons-round">public</span>
          公開社團 ．
          <MembersQtyBtn type="button">30</MembersQtyBtn>
          位成員
        </GroupDesc>
      </Header>
      <Navbar links={navLinks} />
      <Outlet />
    </Wrap>
  );
};

export default Groups;
