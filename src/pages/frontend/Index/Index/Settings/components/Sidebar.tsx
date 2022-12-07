import styled from '@emotion/styled';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Wrap = styled.aside<IThemeProps>`
  height: calc(100vh - 71px);
  width: 400px;
  background-color: ${({ theme }) => theme.color.white_100};
  box-shadow: ${({ theme }) => theme.shadow.m};
  padding: 30px 20px;
`;

const Title = styled.h2`
  margin-bottom: 16px;
`;

const Nav = styled.nav<IThemeProps>`
  > a {
    display: block;
    text-decoration: none;
    font-weight: 700;
    color: ${({ theme }) => theme.color.black_300};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.white_100};
    cursor: default;
    padding: 10px 20px;
    margin-bottom: 5px;
    &:hover {
      filter: brightness(0.97);
    }
    &.active {
      background-color: ${({ theme }) => theme.color.gray_400};
    }
  }
`;

// eslint-disable-next-line arrow-body-style
const Sidebar: React.FC = () => {
  return (
    <Wrap>
      <Title>設定</Title>
      <Nav>
        <NavLink to="/settings/general" className={({ isActive }) => (isActive ? 'active' : '')}>一般設定</NavLink>
        <NavLink to="/settings/account" className={({ isActive }) => (isActive ? 'active' : '')}>帳號設定</NavLink>
      </Nav>
    </Wrap>
  );
};

export default Sidebar;
