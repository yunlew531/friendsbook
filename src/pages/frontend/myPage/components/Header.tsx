import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link, NavLink } from 'react-router-dom';
import Btn from 'components/Btn';
import { useAppSelector } from 'hooks';
import Notifications from './Notifications';

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
  a, .notice-btn {
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
    color: ${({ theme }) => theme.color.gray_500};
    border: none;
    border-top: 2px transparent solid;
    transition: .2s filter ease-in-out;
    background-color: ${({ theme }) => theme.color.white_100};
    cursor: default;
    padding: 0 20px 2px;
    &.login-btn {
      color: ${({ theme }) => theme.color.primary};
    }
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
  a {
    cursor: default;
    transition: transform .05s ease-in-out;
    &:hover {
      transform: scale(0.97);
    }
  }
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
    width: 250px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.color.gray_100};
    padding: 10px;
    &:focus {
      outline: 1px solid ${({ theme }) => theme.color.secondary};
    }
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

interface INoticeContainerProps {
  isNotificationShow: boolean;
}

const NoticeContainer = styled.div<IThemeProps & INoticeContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  transition: filter .2s ease-in-out;
  .notice-btn {
    filter: ${({ isNotificationShow }) => (isNotificationShow ? 'brightness(0.95)' : 'brightness(1)')};
    height: 100%;
  }
`;

const NotificationNum = styled.p<IThemeProps>`
  color: ${({ theme }) => theme.color.white_100};
  font-size: ${({ theme }) => theme.fontSizes.fs_5};
  padding: 2px 2px 1px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.color.green_100};
  margin-left: 5px;
`;

const Header: React.FC = () => {
  const userInfo = useAppSelector((state) => state.userInfo);
  const [isNotificationShow, setIsNotificationShow] = useState(false);

  useEffect(() => {
    const hideNotification = ({ target }: MouseEvent) => {
      const isParentIncludeNoticeContainer = (target as HTMLElement).closest('.notice-container');
      if (!isParentIncludeNoticeContainer) { setIsNotificationShow(false); }
    };

    if (isNotificationShow) document.body.addEventListener('click', hideNotification);
    else document.body.removeEventListener('click', hideNotification);

    return () => document.body.removeEventListener('click', hideNotification);
  }, [isNotificationShow]);

  const { profile, isLogin } = userInfo;

  return (
    <Wrap>
      <div />
      <Nav>
        {
          userInfo.isLogin ? (
            <><NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>首頁</NavLink>
              <NoticeContainer isNotificationShow={isNotificationShow} className="notice-container">
                <button
                  type="button"
                  className="notice-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsNotificationShow(!isNotificationShow);
                  }}
                >
                  通知
                  <NotificationNum>30</NotificationNum>
                </button>
                <Notifications isNotificationShow={isNotificationShow} />
              </NoticeContainer>
              <NavLink to="/chatrooms" className={({ isActive }) => (isActive ? 'active' : '')}>聊天室</NavLink>
              <NavLink to="/clubs" className={({ isActive }) => (isActive ? 'active' : '')}>社團</NavLink>
              <NavLink to="/fans" className={({ isActive }) => (isActive ? 'active' : '')}>粉絲專頁</NavLink>
            </>
          ) : <Link to="/login" className="login-btn">您尚未登入，點選這裡登入</Link>
        }
      </Nav>
      <HeaderRightSide>
        <SearchContainer>
          <input type="text" />
          <SearchBtn type="button">
            <span className="material-icons-outlined search-icon">search</span>
          </SearchBtn>
        </SearchContainer>
        {
          isLogin && (
          <Link to={`/${profile.uid}`}>
            <UserPhoto
              src={profile.avatar_url || `${process.env.PUBLIC_URL}/images/avatar.png`}
              onError={({ currentTarget }) => { currentTarget.src = `${process.env.PUBLIC_URL}/images/avatar.png`; }}
              alt={profile.name}
            />
          </Link>
          )
        }
      </HeaderRightSide>
    </Wrap>
  );
};

export default Header;
