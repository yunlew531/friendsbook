import styled from '@emotion/styled';
import Btn from 'components/Btn';
import Card from 'components/Card';
import dayjs from 'utils/dayjs';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks';

interface IWrap {
  isNotificationShow: boolean;
}

const Wrap = styled(Card)<IThemeProps & IWrap>`
  display: ${({ isNotificationShow }) => (isNotificationShow ? 'block' : 'none')};
  width: 470px;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%) translateY(100%);
  box-shadow: ${({ theme }) => theme.shadow.s};
  padding: 20px 0;
`;

const Title = styled.h3<IThemeProps>`
  color: ${({ theme }) => theme.color.black_300};
  font-size: ${({ theme }) => theme.fontSizes.fs_2};
  margin-bottom: 10px;
  padding: 0 25px;
`;

const ReadBtnGroup = styled.div`
  padding: 0 25px;
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
  max-height: 600px;
  overflow-y: auto;
  list-style: none;
  margin: 10px 0 0;
`;

interface INotificationItemProps {
  read: boolean;
}

const NotificationItem = styled.li<IThemeProps & INotificationItemProps>`
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${({ read, theme: { color: { orange_100, white_100 } } }) => (read ? white_100 : orange_100)};
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
  margin: 5px 25px;
  transition: filter .1s ease-in-out;
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
  &:hover {
    filter: brightness(0.98);
  }
  &:active {
    filter: brightness(0.95);
  }
`;

const RemoveNotificationBtn = styled(Btn)<IThemeProps>`
  align-self: center;
  transition: transform .1s ease-in-out;
  line-height: 0;
  padding: 0;
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

const NotificationNameBtn = styled(Btn)<IThemeProps>`
  color: ${({ theme }) => theme.color.primary};
  font-weight: 700;
  padding: 0; 
`;

const NotificationTime = styled.p<IThemeProps>`
  color: ${({ theme }) => theme.color.gray_300};
  font-size: ${({ theme }) => theme.fontSizes.fs_5};
  margin-top: 3px;
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
  notifications: INotification[];
  hideNotification: ()=> void;
}

type CurrentDisplay = '全部' | '未讀' | '已讀';

const Notifications: React.FC<INotificationsProps> = ({
  isNotificationShow, notifications, hideNotification,
}) => {
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.userInfo.profile);
  const [currentDisplay, setCurrentDisplay] = useState<CurrentDisplay>('全部');
  const [currentNotifications, setCurrentNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    const handleCurrentNotifications = () => {
      let notificationsData = notifications;
      if (currentDisplay === '已讀') {
        notificationsData = notificationsData
          .filter((notification) => notification.read);
      } else if (currentDisplay === '未讀') {
        notificationsData = notificationsData
          .filter((notification) => !notification.read);
      }
      setCurrentNotifications(notificationsData);
    };

    handleCurrentNotifications();
  }, [notifications, currentDisplay]);

  return (
    <Wrap isNotificationShow={isNotificationShow}>
      <Title>通知</Title>
      <ReadBtnGroup>
        <ReadBtn
          type="button"
          anime
          active={currentDisplay === '全部'}
          onClick={() => setCurrentDisplay('全部')}
        >全部
        </ReadBtn>
        <ReadBtn
          type="button"
          anime
          active={currentDisplay === '未讀'}
          onClick={() => setCurrentDisplay('未讀')}
        >未讀
        </ReadBtn>
        <ReadBtn
          type="button"
          anime
          active={currentDisplay === '已讀'}
          onClick={() => setCurrentDisplay('已讀')}
        >已讀
        </ReadBtn>
      </ReadBtnGroup>
      <NotificationList>
        {currentNotifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            read={notification.read}
            onClick={() => {
              navigate(`/${profile.uid}/friends`);
              hideNotification();
            }}
          >
            <span className={`material-icons-outlined read-icon ${notification.read ? 'read' : ''}`}>done_all</span>
            <img src="https://images.unsplash.com/photo-1582152629442-4a864303fb96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80" alt="notice" />
            <NotificationMain>
              <NotificationContent read={notification.read}>
                {/* friend invited */}
                {notification.type === 1 && (
                <>
                  <NotificationNameBtn
                    type="button"
                    className="notification-from"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      navigate(`/${notification.invited_from?.uid}`);
                      hideNotification();
                    }}
                  >{notification.invited_from?.nickname || notification.invited_from?.name}
                  </NotificationNameBtn>
                  對你發出好友邀請。
                </>
                )}

                {/* article tag */}
                {notification.type === 2 && (
                <>
                  <Link to="/user/id" className="notification-from">Alex</Link>
                  在一則
                  <Link to="/post/articleId" className="article-link">貼文</Link>
                  中提到你。
                </>
                )}

                {/* group invited */}
                {notification.type === 3 && (
                <>
                  <Link to="/user/id" className="notification-from">Alex</Link>
                  邀請你加入社團
                  <Link to="/group/groupId" className="group-link">貓貓同好</Link>
                  。
                  <ChooseBtn type="button" className="agree-btn" anime>同意</ChooseBtn>
                  <ChooseBtn type="button" className="reject-btn" anime>拒絕</ChooseBtn>
                </>
                )}

                {/* group new post */}
                {notification.type === 4 && (
                <>
                  <Link to="/user/id" className="notification-from">狗狗社團</Link>
                  發佈了一則新
                  <Link to="/post/articleId" className="article-link sentence-last">貼文</Link>
                  。
                </>
                )}

                {notification.created_at
                 && (
                 <NotificationTime>
                   {dayjs(notification.created_at * 1000).format('YYYY/MM/DD HH:mm:ss')}
                 </NotificationTime>
                 )}
              </NotificationContent>
            </NotificationMain>
            <RemoveNotificationBtn type="button">
              <span className="material-icons-outlined">do_not_disturb_on</span>
            </RemoveNotificationBtn>
          </NotificationItem>
        ))}
      </NotificationList>
    </Wrap>
  );
};

export default Notifications;
