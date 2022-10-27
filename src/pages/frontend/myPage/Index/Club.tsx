import React from 'react';
import styled from '@emotion/styled';
import Btn from 'components/Btn';
import Card from 'components/Card';
import { NavLink, Outlet } from 'react-router-dom';

const Wrap = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled(Card)<IThemeProps>`
  background-color: ${({ theme }) => theme.color.white_100};
  margin-bottom: 16px;
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
  margin-bottom: 16px;
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

const GroupNav = styled.nav<IThemeProps>`
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.color.gray_500};
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
    background-color: ${({ theme }) => theme.color.white_100};
    border: 1px solid ${({ theme }) => theme.color.gray_400};
    border-radius: 8px;
    transition: background-color .1s ease-in-out;
    margin-right: 10px;
    padding: 10px 30px;
    &:hover {
      filter: brightness(0.97);
    }
    &.active {
      color: ${({ theme }) => theme.color.black_300};
      font-weight: 700;
      background-color: ${({ theme }) => theme.color.gray_400};
      box-shadow: inset ${({ theme }) => theme.shadow.s};
    }
  } 
`;

const Groups: React.FC = () => (
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
      <GroupNav>
        <NavLink to="/club/:id" className={({ isActive }) => (isActive ? 'active' : '')} end>討論</NavLink>
        <NavLink to="/club/:id/members" className={({ isActive }) => (isActive ? 'active' : '')}>成員</NavLink>
      </GroupNav>
    </Header>
    <Outlet />
  </Wrap>
);

export default Groups;
