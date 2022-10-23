import styled from '@emotion/styled';
import Btn from 'components/Btn';
import Card from 'components/Card';
import React from 'react';
import { Link } from 'react-router-dom';

interface IWrap {
  isNotificationShow: boolean;
}

const Wrap = styled(Card)<IThemeProps & IWrap>`
  display: ${({ isNotificationShow }) => (isNotificationShow ? 'block' : 'none')};
  width: 450px;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%) translateY(100%);
  box-shadow: ${({ theme }) => theme.shadow.s};
`;

const Title = styled.h3<IThemeProps>`
  color: ${({ theme }) => theme.color.black_300};
  font-size: ${({ theme }) => theme.fontSizes.fs_2};
  margin-bottom: 10px;
`;

interface ReadBtnProps {
  active: boolean;
}

const ReadBtn = styled(Btn)<IThemeProps & ReadBtnProps>`
  background-color: ${({ active, theme: { color: { orange_100, primary } } }) => (active ? primary : orange_100)};
  color: ${({ active, theme: { color: { white_100, black_100 } } }) => (active ? white_100 : black_100)};
  border-radius: 5px;
  font-weight: ${({ active }) => (active ? '700' : '400')};
  padding: 5px 15px;
  margin: 0 10px 5px 0;
`;

const NotificationList = styled.ul`
  list-style: none;
  margin: 10px 0 0;
`;

interface INotificationItemProps {
  read: boolean;
}

const NotificationItem = styled.li<IThemeProps & INotificationItemProps>`
  position: relative;
  display: flex;
  background-color: ${({ read, theme: { color: { orange_100, white_100 } } }) => (read ? white_100 : orange_100)};
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
  img {
    flex-shrink: 0;
    width: 42px;
    height: 42px;
    border-radius: 100%;
    border: 1px solid ${({ theme }) => theme.color.primary};
    padding: 2px;
    margin-right: 10px;
  }
  .material-icons-outlined.read-icon {
    display: none;
    position: absolute;
    top: 50%;
    left: -13px;
    transform: translateY(-50%);
    font-size: ${({ theme }) => theme.fontSizes.fs_5};
    color: ${({ theme }) => theme.color.green_100};
    &.read {
      display: block;
    }
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const RemoveNotificationBtn = styled(Btn)<IThemeProps>`
  transition: transform .1s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
  .material-icons-outlined {
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
    color: ${({ theme }) => theme.color.primary}
  }
`;

const NotificationMain = styled.div<IThemeProps>`
  flex-grow: 1;
`;

interface INotificationContentProps {
  read: boolean;
}

const NotificationContent = styled.div<IThemeProps & INotificationContentProps>`
  font-size: ${({ theme }) => theme.fontSizes.fs_4};
  margin-bottom: 5px;
  a {
    display: inline-block;
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ read, theme: { color: { orange_100, white_100 } } }) => (read ? white_100 : orange_100)};
    font-size: ${({ theme }) => theme.fontSizes.fs_4};
    padding: 0;
  }
  .notification-from {
    margin-right: 5px;
  }
  .article-link {
    margin: 0 5px;
    text-decoration: underline;
    &.sentence-last {
      margin-right: 0;
    }
  }
  .group-link {
    margin-left: 5px;
  }
`;

const NotificationTime = styled.p<IThemeProps>`
  color: ${({ theme }) => theme.color.gray_300};
  font-size: ${({ theme }) => theme.fontSizes.fs_5};
`;

const ChooseBtn = styled(Btn)<IThemeProps>`
  border-radius: 5px;
  &.agree-btn {
    background-color: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.white_100};
    margin: 0 5px;
  }
  &.reject-btn {
    background-color: ${({ theme }) => theme.color.gray_500};
    color: ${({ theme }) => theme.color.white_100};
  }
`;

interface INotificationsProps {
  isNotificationShow: boolean;
}

// eslint-disable-next-line arrow-body-style
const Notifications: React.FC<INotificationsProps> = ({ isNotificationShow }) => {
  return (
    <Wrap isNotificationShow={isNotificationShow}>
      <Title>通知</Title>
      <ReadBtn type="button" anime active>全部</ReadBtn>
      <ReadBtn type="button" anime active={false}>未讀</ReadBtn>
      <ReadBtn type="button" anime active={false}>已讀</ReadBtn>
      <NotificationList>
        {/* 文章 tag */}
        <NotificationItem read>
          <span className={`material-icons-outlined read-icon ${'data.read' ? 'read' : ''}`}>done_all</span>
          <img src="https://images.unsplash.com/photo-1582152629442-4a864303fb96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80" alt="notice" />
          <NotificationMain>
            <NotificationContent read>
              <Link to="/user/id" className="notification-from">Alex</Link>
              在一則
              <Link to="/post/articleId" className="article-link">貼文</Link>
              中提到你。
            </NotificationContent>
            <NotificationTime>2022-10-20 20:09:22</NotificationTime>
          </NotificationMain>
          <RemoveNotificationBtn type="button">
            <span className="material-icons-outlined">do_not_disturb_on</span>
          </RemoveNotificationBtn>
        </NotificationItem>
        {/* 社團邀請 */}
        <NotificationItem read={false}>
          <span className={`material-icons-outlined read-icon ${!'data.read' ? 'read' : ''}`}>done_all</span>
          <img src="https://images.unsplash.com/photo-1582152629442-4a864303fb96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80" alt="notice" />
          <NotificationMain>
            <NotificationContent read={false}>
              <Link to="/user/id" className="notification-from">Alex</Link>
              邀請你加入社團
              <Link to="/group/groupId" className="group-link">貓貓同好</Link>
              。
              <ChooseBtn type="button" className="agree-btn" anime>同意</ChooseBtn>
              <ChooseBtn type="button" className="reject-btn" anime>拒絕</ChooseBtn>
            </NotificationContent>
            <NotificationTime>2022-10-20 20:09:22</NotificationTime>
          </NotificationMain>
          <RemoveNotificationBtn type="button">
            <span className="material-icons-outlined">do_not_disturb_on</span>
          </RemoveNotificationBtn>
        </NotificationItem>
        {/* 好友邀請 */}
        <NotificationItem read={false}>
          <span className={`material-icons-outlined read-icon ${!'data.read' ? 'read' : ''}`}>done_all</span>
          <img src="https://images.unsplash.com/photo-1582152629442-4a864303fb96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80" alt="notice" />
          <NotificationMain>
            <NotificationContent read={false}>
              <Link to="/user/id" className="notification-from">Alex</Link>
              對你發出好友邀請。
              <ChooseBtn type="button" className="agree-btn" anime>同意</ChooseBtn>
              <ChooseBtn type="button" className="reject-btn" anime>拒絕</ChooseBtn>
            </NotificationContent>
            <NotificationTime>2022-10-20 20:09:22</NotificationTime>
          </NotificationMain>
          <RemoveNotificationBtn type="button">
            <span className="material-icons-outlined">do_not_disturb_on</span>
          </RemoveNotificationBtn>
        </NotificationItem>
        {/* 發佈新貼文 */}
        <NotificationItem read>
          <span className={`material-icons-outlined read-icon ${'data.read' ? 'read' : ''}`}>done_all</span>
          <img src="https://images.unsplash.com/photo-1582152629442-4a864303fb96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80" alt="notice" />
          <NotificationMain>
            <NotificationContent read>
              <Link to="/user/id" className="notification-from">狗狗社團</Link>
              發佈了一則新
              <Link to="/post/articleId" className="article-link sentence-last">貼文</Link>
              。
            </NotificationContent>
            <NotificationTime>2022-10-20 20:09:22</NotificationTime>
          </NotificationMain>
          <RemoveNotificationBtn type="button">
            <span className="material-icons-outlined">do_not_disturb_on</span>
          </RemoveNotificationBtn>
        </NotificationItem>
      </NotificationList>
    </Wrap>
  );
};

export default Notifications;
