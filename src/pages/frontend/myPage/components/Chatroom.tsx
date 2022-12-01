import styled from '@emotion/styled';
import Btn from 'components/Btn';
import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useGetChatroomsQuery } from 'services/chatroom';
import { getChatrooms, openChatroomWindow, removeChatroom } from 'slices/chatroomsSlice';
import { Socket } from 'socket.io-client';
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
    .remove-chatroom-btn {
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

interface IChatroomProps {
  showCreateChatRoomModel: () => void;
  ws: Socket;
}

const Chatroom: React.FC<IChatroomProps> = ({ showCreateChatRoomModel, ws }) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.userInfo.profile);
  const chatrooms = useAppSelector((state) => state.chatrooms);
  // const [isMoreListShow, setIsMoreListShow] = useState(false);
  const [isChatRoomListFold, setIsChatRoomListFold] = useState(false);
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const { data: chatroomsResult, isSuccess: isGetChatroomsSuccess } = useGetChatroomsQuery();

  useEffect(() => {
    if (isGetChatroomsSuccess) dispatch(getChatrooms(chatroomsResult));
  }, [isGetChatroomsSuccess]);

  return (
    <Wrap>
      {chatrooms.chatroomWindows.map(
        (chatroom) => <ChatroomWindow key={chatroom.id} chatroom={chatroom} ws={ws} />,
      )}
      <ChatroomList unfold={isChatRoomListFold}>
        {
          chatrooms.openedChatrooms.map((chatroom) => (
            <ChatroomItem key={chatroom.id} onClick={() => dispatch(openChatroomWindow(chatroom))}>
              <RemoveChatroomBtn
                type="button"
                className="remove-chatroom-btn"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  dispatch(removeChatroom(chatroom));
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
