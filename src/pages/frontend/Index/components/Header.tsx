import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Btn from 'components/Btn';
import { useAppDispatch, useAppSelector } from 'hooks';
import Card from 'components/Card';
import { logout } from 'slices/userInfoSlice';
import { useGetNotificationsByTokenQuery } from 'services/notification';
import Cookies from 'js-cookie';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import Notifications from './Notifications';

const Wrap = styled.header<IThemeProps & { isLogin: boolean }>`
  position: fixed;
  right: 0;
  left: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.cardColor};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  padding: ${({ isLogin }) => (isLogin ? '0 17px 0 75px' : '0 17px')};
`;

const Nav = styled.nav<IThemeProps & { isLogin: boolean }>`
  display: flex;
  flex-grow: 1;
  justify-content: ${({ isLogin }) => (isLogin ? 'center' : 'space-between')};
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
  .homepage-link {
    padding: 0;
    cursor: pointer;
    img {
      margin: 0 0 2px 1px;
    }
    &:hover {
      filter: brightness(1);
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
  min-width: 15px;
  color: ${({ theme }) => theme.color.white_100};
  font-size: ${({ theme }) => theme.fontSizes.fs_5};
  padding: 2px 2px 1px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.color.green_100};
  margin-left: 5px;
`;

const FriendsIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 15px;
`;

const UserInfoContainer = styled.div<IThemeProps>`
  width: 50px;
  height: 50px;
  position: relative;
`;

const UserInfo = styled(Card)<IThemeProps & { show: boolean }>`
  background-color: ${({ theme }) => theme.color.white_100};
  position: absolute;
  right: 0;
  top: ${({ show }) => (show ? '-8px' : '0')};
  right: ${({ show }) => (show ? '-15px' : '0')};
  padding: ${({ show }) => (show ? '8px 15px' : '0')};
  transition: .3s ease-in-out;
  border: 1px solid ${({ show, theme: { color: { gray_400 } } }) => (show ? gray_400 : 'transparent')};
`;

const UserInfoHeader = styled.div<IThemeProps & { show: boolean }>`
  display: flex;
  align-items: center;
  transition: margin .3s linear;
  margin-bottom: ${({ show }) => (show ? '10px' : 0)};
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.color.black_300};
    font-weight: 700;
  }
  .name {
    width: 0;
    overflow: hidden;
    text-align: center;
    margin-right: 0;
    opacity: 0;
    transition: width .2s ease-in-out, opacity 0.2s 0s, margin .2s ease-in-out;
    &.show {
      width: 70px;
      margin-right: 16px;
      opacity: 1;
      transition: width .2s ease-in-out, opacity 0.2s 0.2s;
    }
  }
`;

const UserInfoBtn = styled(Btn)<IThemeProps & { show: boolean }>`
  display: block;
  width: 100%;
  height: 0;
  opacity: 0;
  overflow: hidden;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.white_100};
  color: ${({ theme }) => theme.color.black_200};
  font-weight: 700;
  margin: auto;
  transition: filter .1s ease-in-out, height .2s ease-in-out, opacity .1s;
  &.show {
    opacity: 1;
    height: 35px;
    transition: filter .1s ease-in-out, height .2s ease-in-out, opacity 0.3s 0.2s;
  }
  &:hover {
    filter: brightness(0.92);
  }
  &:active {
    filter: brightness(0.85);
  }
`;

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const jwtToken = Cookies.get('Friendsbook');
  const userInfo = useAppSelector((state) => state.userInfo);
  const {
    data: notificationsResult, isSuccess: isGetNotificationSuccess,
  } = useGetNotificationsByTokenQuery(jwtToken || skipToken);
  const [isNotificationShow, setIsNotificationShow] = useState(false);
  const [isUserInfoShow, setIsUserInfoShow] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const hideNotification = () => setIsNotificationShow(false);

  useEffect(() => {
    const handleNotifications = ({ target }: MouseEvent) => {
      const isParentIncludeNoticeContainer = (target as HTMLElement).closest('.notice-container');
      if (!isParentIncludeNoticeContainer) hideNotification();
    };

    if (isNotificationShow) document.body.addEventListener('click', handleNotifications);
    else document.body.removeEventListener('click', handleNotifications);

    return () => document.body.removeEventListener('click', handleNotifications);
  }, [isNotificationShow]);

  useEffect(() => {
    if (notificationsResult) setNotifications(notificationsResult.notifications);
  }, [isGetNotificationSuccess]);

  const { profile, isLogin } = userInfo;

  return (
    <Wrap isLogin={userInfo.isLogin}>
      <div />
      <Nav isLogin={userInfo.isLogin}>
        {
          userInfo.isLogin ? (
            <>
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>??????</NavLink>
              <NoticeContainer isNotificationShow={isNotificationShow} className="notice-container">
                <button
                  type="button"
                  className="notice-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsNotificationShow(!isNotificationShow);
                  }}
                >
                  ??????
                  <NotificationNum>
                    {notifications.filter((notification) => !notification.read).length}
                  </NotificationNum>
                </button>
                <Notifications
                  isNotificationShow={isNotificationShow}
                  notifications={notifications}
                  hideNotification={hideNotification}
                />
              </NoticeContainer>
              <NavLink to="/chatrooms" className={({ isActive }) => (isActive ? 'active' : '')}>?????????</NavLink>
              <NavLink to="/clubs" className={({ isActive }) => (isActive ? 'active' : '')}>??????</NavLink>
              <NavLink to="/fans" className={({ isActive }) => (isActive ? 'active' : '')}>????????????</NavLink>
            </>
          ) : (
            <>
              <Link to="/" className="homepage-link">
                <FriendsIcon src={`${process.env.PUBLIC_URL}/images/friends.png`} />
              </Link>
              <Link to="/login" className="login-btn">????????????????????????????????????</Link>
              <div />
            </>
          )
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
            <UserInfoContainer>
              <UserInfo
                show={isUserInfoShow}
                onMouseLeave={() => setIsUserInfoShow(false)}
              >
                <UserInfoHeader show={isUserInfoShow}>
                  <Link to={`/${profile.uid}`} className={`name ${isUserInfoShow && 'show'}`}>
                    {profile.name}
                  </Link>
                  <UserPhoto
                    src={profile.avatar_url || `${process.env.PUBLIC_URL}/images/avatar.png`}
                    onError={({ currentTarget }) => { currentTarget.src = `${process.env.PUBLIC_URL}/images/avatar.png`; }}
                    alt={profile.name}
                    onMouseEnter={() => setIsUserInfoShow(true)}
                  />
                </UserInfoHeader>
                <UserInfoBtn
                  type="button"
                  show={isUserInfoShow}
                  className={`${isUserInfoShow && 'show'}`}
                  onClick={() => navigate(`/${profile.uid}`)}
                >????????????
                </UserInfoBtn>
                <UserInfoBtn
                  type="button"
                  show={isUserInfoShow}
                  className={`${isUserInfoShow && 'show'}`}
                  onClick={() => {
                    dispatch(logout());
                    navigate(0);
                  }}
                >??????
                </UserInfoBtn>
              </UserInfo>
            </UserInfoContainer>
          )
        }
      </HeaderRightSide>
    </Wrap>
  );
};

export default Header;
