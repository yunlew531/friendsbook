import styled from '@emotion/styled';
import React from 'react';
import dayjs from 'utils/dayjs';
import handleIsOnline from 'utils/handleIsOnline';

const Wrap = styled.ul<IThemeProps>`
  width: 350px;
  min-height: 300px;
  list-style: none;
  background-color: ${({ theme }) => theme.color.gray_300};
  border-radius: 8px;
  padding: 16px;
  margin: 0;
`;

const FriendItem = styled.li<IThemeProps>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white_100};
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  &:last-of-type {
    margin-bottom: 0;
  }
  .done-icon {
    color: ${({ theme }) => theme.color.green_100};
    font-size: ${({ theme }) => theme.fontSizes.fs_2};
  }
`;

const FriendItemPhoto = styled.div<IThemeProps & { online: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 2px solid ${({ online, theme: { color: { green_100 } } }) => (online ? green_100 : 'transparent')};
  overflow: hidden;
  margin-right: 10px;
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

interface IFriendListProps {
  friends: IFriend[];
  selectedUsers?: IFriend[];
  chatroomType?: ChatroomType;
  setSelectedUsers?: React.Dispatch<React.SetStateAction<IFriend[]>>;
  setFriends?: React.Dispatch<React.SetStateAction<IFriend[]>>;
  friendListType?: 'selected';
}

const FriendList: React.FC<IFriendListProps> = ({
  friends, selectedUsers, chatroomType, setSelectedUsers, friendListType, setFriends,
}) => {
  const handleSelectedUsers = (friend: IFriend) => {
    if (!selectedUsers || !setSelectedUsers) return;
    const tempSelectedUsers = [...selectedUsers];
    if (chatroomType === 'oneToOne') {
      // TODO: isChatroomExist use in create chatroom btn
      // const isChatroomExist =
      // chatrooms.some((chatroom) => chatroom.members.includes(friend.uid!));
      tempSelectedUsers.splice(0, selectedUsers.length);
      tempSelectedUsers.push(friend);
    } else if (chatroomType === 'multipleCreate') {
      if (!setFriends) return;
      if (friendListType === 'selected') {
        const selectedIndex = tempSelectedUsers.findIndex((user) => user.id === friend.id);
        if (selectedIndex !== -1) tempSelectedUsers.splice(selectedIndex, 1);
        setFriends((prev) => {
          const users = [...prev];
          users.push(friend);
          return users;
        });
      } else {
        setFriends((prev) => {
          const users = [...prev];
          const userIndex = users.findIndex((user) => user.id === friend.id);
          if (userIndex !== -1) users.splice(userIndex, 1);
          return users;
        });
        tempSelectedUsers.push(friend);
      }
    }
    setSelectedUsers(tempSelectedUsers);
  };

  return (
    <Wrap>
      {friends?.map((friend) => (
        <FriendItem key={friend.uid} onClick={() => handleSelectedUsers(friend)}>
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
          </FriendItemMain>
          {selectedUsers?.some((user) => user.id === friend.id)
            && <span className="material-icons-outlined done-icon">done</span>}
        </FriendItem>
      ))}
    </Wrap>
  );
};

FriendList.defaultProps = {
  friendListType: undefined,
  setFriends: undefined,
  setSelectedUsers: undefined,
  chatroomType: undefined,
  selectedUsers: [],
};

export default FriendList;
