import React from 'react';
import type { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import handleIsOnline from 'utils/handleIsOnline';
import { useNavigate } from 'react-router-dom';
import dayjs from 'utils/dayjs';

const FriendItem = styled.li<IThemeProps & { length?: number }>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.cardColor};  
  border: 1px solid ${({ theme }) => theme.color.gray_400};
  padding: 11px 23px;
  margin-bottom: -1px;
  .link-name {
    font-weight: 700;
    color: ${({ theme }) => theme.color.gray_500};
  }
  &:first-of-type {
    border-radius: 8px 8px 0 0;
  }
  &:last-of-type {
    border-radius: 0 0 8px 8px;
    margin-bottom: 0;
  }
  &:hover {
    filter: brightness(0.95);
  }
  &:active {
    filter: brightness(0.9);
  }
  ${({ length }) => length === 1 && `
    &:first-of-type {
      border-radius: 8px;
    }
  `}
`;

const FriendItemPhoto = styled.div<IThemeProps & { online: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 2px solid ${({ online, theme: { color: { green_100 } } }) => (online ? green_100 : 'transparent')};
  overflow: hidden;
  margin-right: 15px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: 1px solid ${({ theme }) => theme.color.white_100};
  }
`;

const FriendItemMain = styled.div<IThemeProps>`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.fs_4};
  color: ${({ theme }) => theme.color.black_300};
  cursor: default;
  .last-seen {
    text-align: center;
    line-height: 1.3;
    color: ${({ theme }) => theme.color.gray_500};
    font-size: ${({ theme }) => theme.fontSizes.fs_5};
  }
`;

interface FriendProps {
  friend: IFriend;
  length?: number;
}

const Friend: React.FC<FriendProps & PropsWithChildren> = ({ friend, children, length }) => {
  const navigate = useNavigate();

  return (
    <FriendItem key={friend.uid} length={length} onClick={() => navigate(`/${friend.uid}`)}>
      <FriendItemPhoto online={handleIsOnline(friend.last_seen)}>
        <img
          src={friend.avatar_url || `${process.env.PUBLIC_URL}/images/avatar.png`}
          onError={({ currentTarget }) => { currentTarget.src = `${process.env.PUBLIC_URL}/images/avatar.png`; }}
          alt={`user ${friend.name}`}
        />
      </FriendItemPhoto>
      <FriendItemMain>
        <div>
          <p className="link-name">{friend.nickname || friend.name}</p>
          {friend?.last_seen && (
          <p className="last-seen">最後上線: &nbsp;
            {dayjs(friend.last_seen * 1000).fromNow()}
          </p>
          )}
        </div>
        <div>{children}</div>
      </FriendItemMain>
    </FriendItem>
  );
};

Friend.defaultProps = {
  length: undefined,
};

export default Friend;
