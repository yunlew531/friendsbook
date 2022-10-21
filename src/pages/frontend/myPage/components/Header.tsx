import React from 'react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import Btn from 'components/Btn';

const Wrap = styled.header<IThemeProps>`
  position: fixed;
  right: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.cardColor};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  padding: 0 17px 0 75px;
`;

const Nav = styled.nav<IThemeProps>`
  display: flex;
  align-items: stretch;
  height: 70px;
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${({ theme }) => theme.color.gray_500};
    border-top: 2px transparent solid;
    transition: .2s filter ease-in-out;
    background-color: ${({ theme }) => theme.color.white_100};
    cursor: default;
    padding: 0 20px 2px;
    &.active {
      color: ${({ theme }) => theme.color.primary};
      border-top: 2px solid ${({ theme }) => theme.color.primary};
    }
    &:hover {
      filter: brightness(0.95);
    }
  }
`;

const HeaderRightSide = styled.div`
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div<IThemeProps>`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 15px;
  input {
    position: absolute;
    right: 0;
    border-radius: 10px;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.color.primary};
    width: 250px;
  }
`;

const SearchBtn = styled(Btn)<IThemeProps>`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  .search-icon {
    font-size: ${({ theme }) => theme.fontSizes.s};
    color: ${({ theme }) => theme.color.gray_300};
    transition: color .2s ease-in-out, transform .1s ease-in-out;
  }
  &:hover {
    .search-icon {
      color: ${({ theme }) => theme.color.primary}
    }
  }
  &:active {
    .search-icon {
      transform: scale(0.9);
    }
  }
`;

const UserPhoto = styled.img<IThemeProps>`
  width: 48px;
  height: 48px;
  border-radius: 100%;
  border: 2px solid ${({ theme }) => theme.color.primary};
`;

// eslint-disable-next-line arrow-body-style
const Header: React.FC = () => {
  return (
    <Wrap>
      <div />
      <Nav>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>首頁</NavLink>
        <NavLink to="/notices" className={({ isActive }) => (isActive ? 'active' : '')}>通知</NavLink>
        <NavLink to="/chatrooms" className={({ isActive }) => (isActive ? 'active' : '')}>聊天室</NavLink>
        <NavLink to="/groups" className={({ isActive }) => (isActive ? 'active' : '')}>社團</NavLink>
        <NavLink to="/story" className={({ isActive }) => (isActive ? 'active' : '')}>限時動態</NavLink>
      </Nav>
      <HeaderRightSide>
        <SearchContainer>
          <input type="text" />
          <SearchBtn type="button">
            <span className="material-icons-outlined search-icon">search</span>
          </SearchBtn>
        </SearchContainer>
        <UserPhoto src="https://images.unsplash.com/photo-1612000529646-f424a2aa1bff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
      </HeaderRightSide>
    </Wrap>
  );
};

export default Header;
