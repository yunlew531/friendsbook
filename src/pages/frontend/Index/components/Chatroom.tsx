import styled from '@emotion/styled';
import Btn from 'components/Btn';
import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useGetChatroomsQuery } from 'services/chatroom';
import { getChatrooms, openChatroomWindow, removeChatroom } from 'slices/chatroomsSlice';
import ChatroomWindow from './ChatroomWindow';

const Wrap = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-right: 20px;
`;

const ChatroomWindowsContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 50px;
  display: flex;
`;

interface IChatroomListProps {
  unfold: boolean;
}

const ChatroomList = styled.ul<IThemeProps & IChatroomListProps>`
  display: flex;
  flex-direction: column-reverse;
  list-style: none;
  transition: transform .5s ease-in-out;
  transform: ${({ unfold }) => (unfold ? 'translateY(calc(100% - 35px))' : 'translateY(0)')};
  margin: 0;
`;

const HideChatroomBtn = styled(Btn)<IThemeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow.s};
  border: 1px solid ${({ theme }) => theme.color.gray_400};
  .material-icons, .material-icons-round {
    display: none;
    color: ${({ theme }) => theme.color.secondary};
    &.show {
      display: block;
    }
  }
`;

const ChatroomItem = styled.li<IThemeProps>`
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: ${({ theme }) => theme.shadow.s};
  border-radius: 100%;
  cursor: default;
  user-select: none;
  transition: transform .1s ease-in-out;
  margin-bottom: 5px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: ${({ theme }) => theme.color.white_100};
    box-shadow: ${({ theme }) => theme.shadow.m};
    padding: 2px;
  }
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
  &.add-chatroom-btn {
    margin-bottom: 10px;
  }
  .remove-chatroom-btn {
    display: none;
  }
  &:hover {
    .remove-chatroom-btn, .chatroom-item-name {
      display: block;
    }
  }
`;

const RemoveChatroomBtn = styled.button<IThemeProps>`
  position: absolute;
  top: -3px;
  right: -3px;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 100%;
  background-color: transparent;
  padding: 0;
  .material-icons-outlined {
    color: ${({ theme }) => theme.color.red_100};
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
    font-weight: 700;
  }
`;

const ChatroomItemName = styled.p<IThemeProps>`
  display: none;
  position: absolute;
  left: -3px;
  top: 50%;
  transform: translateX(-100%) translateY(-50%);
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.white_100};
  padding: 3px 6px;
  border: 1px solid ${({ theme }) => theme.color.gray_100};
`;

interface IChatroomProps {
  showCreateChatRoomModel: () => void;
  setChatroomType: React.Dispatch<React.SetStateAction<ChatroomType>>;
  setSelectedUsers: React.Dispatch<React.SetStateAction<IFriend[]>>;
  setUsers: React.Dispatch<React.SetStateAction<IFriend[]>>;
}

const Chatroom: React.FC<IChatroomProps> = ({
  showCreateChatRoomModel, setChatroomType, setSelectedUsers, setUsers,
}) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.userInfo.profile);
  const chatrooms = useAppSelector((state) => state.chatrooms);
  const [isChatRoomListFold, setIsChatRoomListFold] = useState(false);
  const { data: chatroomsResult, isSuccess: isGetChatroomsSuccess } = useGetChatroomsQuery();

  useEffect(() => {
    if (isGetChatroomsSuccess && profile.uid) {
      dispatch(getChatrooms({
        chatrooms: chatroomsResult.chatrooms,
        uid: profile.uid!,
      }));
    }
  }, [isGetChatroomsSuccess, profile.uid]);

  return (
    <Wrap>
      <ChatroomWindowsContainer>
        {chatrooms.chatrooms.filter((chatroom) => chatroom.openWindow).map(
          (chatroom) => (
            <ChatroomWindow
              key={chatroom.id}
              chatroom={chatroom}
              showCreateChatRoomModel={showCreateChatRoomModel}
              setChatroomType={setChatroomType}
              setSelectedUsers={setSelectedUsers}
              setUsers={setUsers}
            />
          ),
        )}
      </ChatroomWindowsContainer>
      <ChatroomList unfold={isChatRoomListFold}>
        {
          chatrooms.chatrooms.filter((chatroom) => chatroom.inOpenList).map((chatroom) => (
            <ChatroomItem
              key={chatroom.id}
              onClick={() => dispatch(openChatroomWindow({ chatroom, uid: profile.uid! }))}
            >
              <ChatroomItemName className="chatroom-item-name">{chatroom.name}</ChatroomItemName>
              <RemoveChatroomBtn
                type="button"
                className="remove-chatroom-btn"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  dispatch(removeChatroom({ chatroom, uid: profile.uid! }));
                }}
              >
                <span className="material-icons-outlined">close</span>
              </RemoveChatroomBtn>
              <img
                src={chatroom.avatar_url || `${process.env.PUBLIC_URL}/images/${chatroom.type === 1 ? 'avatar' : 'group'}.png`}
                onError={({ currentTarget }) => {
                  currentTarget.src = `${process.env.PUBLIC_URL}/images/${chatroom.type === 1 ? 'avatar' : 'group'}.png`;
                }}
                alt={profile.name}
              />
            </ChatroomItem>
          ))
        }
        <ChatroomItem className="add-chatroom-btn" onClick={showCreateChatRoomModel}>
          <span className="material-icons-outlined">add</span>
        </ChatroomItem>
        <li>
          <HideChatroomBtn type="button" anime onClick={() => setIsChatRoomListFold(!isChatRoomListFold)}>
            <span className={`material-icons ${isChatRoomListFold ? 'show' : ''}`}>people_alt</span>
            <span className={`material-icons-round ${isChatRoomListFold ? '' : 'show'}`}>expand_more</span>
          </HideChatroomBtn>
        </li>
      </ChatroomList>
    </Wrap>
  );
};

export default Chatroom;
