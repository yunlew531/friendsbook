import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Btn from 'components/Btn';
import { useAppDispatch, useAppSelector } from 'hooks';
import { closeChatroomWindow } from 'slices/chatroomsSlice';
import { Socket } from 'socket.io-client';

interface IChatroomElProps {
  unfold: boolean;
}

const ChatroomEl = styled.div<IThemeProps & IChatroomElProps>`
  position: relative;
  align-self: flex-end;
  transform: ${({ unfold }) => (unfold ? 'translateY(0)' : 'translateY(355px)')} ;
  width: 350px;
  height: 400px;
  background-color: ${({ theme }) => theme.color.white_100};
  border: 1px solid ${({ theme }) => theme.color.gray_400};
  border-radius: 8px 8px 0 0;
  box-shadow: ${({ theme }) => theme.shadow.l};
  transition: transform .2s ease-in-out;
  margin-right: 20px;
`;

const Header = styled.div<IThemeProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_400};
`;

const UsernameContainer = styled.div<IThemeProps>`
  position: relative;
`;

interface IUsernameBtnProps {
  active: boolean;
}

const UsernameBtn = styled(Btn)<IThemeProps & IUsernameBtnProps>`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.fs_3};
  border-radius: 8px 0 0;
  background-color: ${({ theme }) => theme.color.white_100};
  padding: 10px 10px 10px 15px;
  transition: filter .2s ease-in-out;
  filter: ${({ active }) => (active ? 'brightness(0.95)' : 'brightness(1)')};
  .material-icons-outlined {
    transform: ${({ active }) => (active ? 'rotate(180deg)' : 'rotate(0deg)')};
    color: ${({ theme }) => theme.color.gray_500};
  }
  &:hover {
    filter: brightness(0.95);
  }
  &:active {
    filter: brightness(0.9);
  }
`;

interface IMoreListProps {
  show: boolean;
}

const MoreList = styled.ul<IThemeProps & IMoreListProps>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  bottom: -5px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.gray_100};
  list-style: none;
  box-shadow: ${({ theme }) => theme.shadow.s};
  transform: translateY(100%);
  overflow: hidden;
  margin: 0;
`;

const MoreItem = styled.li<IThemeProps>`
  white-space: nowrap;
  text-align: center;
  background-color: ${({ theme }) => theme.color.white_100};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_400};
  color: ${({ theme }) => theme.color.black_400};
  transition: filter .1s ease-in-out;
  cursor: default;
  padding: 10px 20px;
  > a {
    color: ${({ theme }) => theme.color.black_400};
    text-decoration: none;
    cursor: default;
  }
  &:last-of-type {
    border: none;
  }
  &:hover {
    filter: brightness(0.95);
  }
  &:active {
    filter: brightness(0.9);
  }
`;

const HeaderBtnGroup = styled.div<IThemeProps>`
  button {
    line-height: 0;
    background-color: transparent;
    border: none;
    padding: 0;
    transition: color .1s ease-in-out;
    &:first-of-type {
      margin-right: 5px;
    }
    &:hover {
      transform: scale(1.05);
      color: ${({ theme }) => theme.color.gray_500};
    }
    &:active {
      transform: scale(0.95);
    }
    .material-icons-outlined {
      font-size: ${({ theme }) => theme.fontSizes.fs_1};
    }
  }
`;

const MsgList = styled.ul`
  display: flex;
  flex-direction: column;
  height: calc(400px - 45px - 50.31px);
  overflow: auto;
  list-style: none;
  margin: 0;
  padding: 5px 10px;
`;

const Footer = styled.div<IThemeProps>`
  display: flex;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.color.gray_400};
  padding: 10px;
`;

const Input = styled.input<IThemeProps>`
  flex-grow: 1;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.gray_100};
  padding: 5px;
  margin-right: 10px;
  caret-color: ${({ theme }) => theme.color.primary};
  &:focus {
    outline: 1px solid ${({ theme }) => theme.color.secondary};
  }
`;

const SendMsgBtn = styled(Btn)<IThemeProps>`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.fs_4};
  color: ${({ theme }) => theme.color.white_100};
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: 5px;
  padding: 0 20px;
`;

const ThumbsUpBtn = styled(Btn)<IThemeProps>`
  .material-icons {
    color: ${({ theme }) => theme.color.primary};
  }
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`;

interface IMsgItemProps {
  isMyself: boolean;
}

const MsgItem = styled.li<IThemeProps & IMsgItemProps>`
  align-self: ${({ isMyself }) => (isMyself ? 'flex-end' : 'flex-start')};
  display: flex;
  margin-bottom: 10px;
  .user-photo {
    order: ${({ isMyself }) => (isMyself ? 1 : 0)};
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    margin: ${({ isMyself }) => (isMyself ? '0 0 0 6px' : '0 6px 0 0')};
  }
  p {
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.color.gray_400};
    box-shadow: ${({ theme }) => theme.shadow.s};
    padding: 5px 10px;
    margin: ${({ isMyself }) => (isMyself ? '0 0 0 35px' : '0 35px 0 0')};
  }
`;

interface IChatroomWindowProps {
  chatroom: IChatroom;
  ws: Socket;
}

const ChatroomWindow: React.FC<IChatroomWindowProps> = ({ chatroom, ws }) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.userInfo.profile);
  const [input, setInput] = useState('');

  return (
    <ChatroomEl
      key={chatroom.id}
    // unfold={isChatroomUnFold = true}
      unfold
    >
      <Header>
        <UsernameContainer>
          <UsernameBtn
            type="button"
          // active={isMoreListShow}
            active
            onClick={() => {
            // if (isChatroomUnFold)setIsMoreListShow(!isMoreListShow);
            }}
          >{chatroom.name}
            <span className="material-icons-outlined">expand_more</span>
          </UsernameBtn>
          <MoreList show={false}>
            {/* <MoreList show={isMoreListShow}> */}
            <MoreItem onClick={() => {
            // ws.emit('create chatroom', 'new');
            }}
            >建立群聊
            </MoreItem>
            <MoreItem>
              <Link to="/user/userId">前往頁面</Link>
            </MoreItem>
          </MoreList>
        </UsernameContainer>
        <HeaderBtnGroup>
          <button
            type="button"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
            // setIsChatroomUnFold(false);
            }}
          >
            <span className="material-icons-outlined">remove</span>
          </button>
          <button type="button" onClick={() => dispatch(closeChatroomWindow(chatroom))}>
            <span className="material-icons-outlined">close</span>
          </button>
        </HeaderBtnGroup>
      </Header>
      <MsgList>
        {chatroom.chats?.map((chat) => (
          <MsgItem key={chat.id} isMyself={chat.user_uid === profile.uid}>
            <img
              className="user-photo"
              src={`${process.env.PUBLIC_URL}/images/avatar.png`}
      // src={friend.avatar_url || `${process.env.PUBLIC_URL}/images/avatar.png`}
              onError={({ currentTarget }) => { currentTarget.src = `${process.env.PUBLIC_URL}/images/avatar.png`; }}
              alt="user"
            />
            <p>{chat.content}</p>
          </MsgItem>
        ))}
      </MsgList>
      <Footer>
        <Input type="text" value={input} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} />
        <SendMsgBtn
          type="button"
          anime
          onClick={() => {
            ws.emit('chat', { chatroom_id: chatroom.id, content: input, user_uid: profile.uid });
            setInput('');
          }}
        >送出
        </SendMsgBtn>
        <ThumbsUpBtn type="button" anime>
          <span className="material-icons">thumb_up</span>
        </ThumbsUpBtn>
      </Footer>
    </ChatroomEl>
  );
};

export default ChatroomWindow;
