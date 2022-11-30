import styled from '@emotion/styled';
import Btn from 'components/Btn';
import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetChatroomsQuery } from 'services/chatroom';
import { getChatrooms } from 'slices/chatroomsSlice';
import { io, Socket } from 'socket.io-client';

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
`;

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

interface IChatroomProps {
  showCreateChatRoomModel: () => void;
}

const Chatroom: React.FC<IChatroomProps> = ({ showCreateChatRoomModel }) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.userInfo.profile);
  // const [isMoreListShow, setIsMoreListShow] = useState(false);
  const [isChatRoomListFold, setIsChatRoomListFold] = useState(false);
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [ws, setWs] = useState<Socket>();
  const [chatroomIcons] = useState<IChatroom[]>([]);
  const { data: chatroomsResult, isSuccess: isGetChatroomsSuccess } = useGetChatroomsQuery();
  // const [chatroomIcons, setChatroomIcons] = useState<IChatroom[]>([]);

  useEffect(() => {
    setWs(io('http://localhost:5500'));

    return () => {
      ws?.off('connect');
      ws?.off('msgs');
      // ws?.off('disconnect');
    };
  }, []);

  useEffect(() => {
    if (isGetChatroomsSuccess) dispatch(getChatrooms(chatroomsResult));
  }, [isGetChatroomsSuccess]);

  useEffect(() => {
    ws?.on('connect', () => {
      if (profile.uid) { ws.emit('join chatrooms', profile.uid); }

      ws.on('msgs', (msg: string) => {
        console.log(msg);
      });
    });
  }, [ws, profile]);

  return (
    <Wrap>
      {Array.from({ length: 2 }).map((item, key) => (
        <ChatroomEl
          // eslint-disable-next-line react/no-array-index-key
          key={key}
          // unfold={isChatroomUnFold = true}
          unfold
          // onClick={() => setIsChatroomUnFold(true)}
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
              >Tom Tom
                <span className="material-icons-outlined">expand_more</span>
              </UsernameBtn>
              <MoreList show>
                {/* <MoreList show={isMoreListShow}> */}
                <MoreItem onClick={() => {
                  ws?.emit('msg', 'body');
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
              <button type="button">
                <span className="material-icons-outlined">close</span>
              </button>
            </HeaderBtnGroup>
          </Header>
          <MsgList>
            <MsgItem isMyself>
              <img
                className="user-photo"
                src=""
            // src={friend.avatar_url || `${process.env.PUBLIC_URL}/images/avatar.png`}
                onError={({ currentTarget }) => { currentTarget.src = `${process.env.PUBLIC_URL}/images/avatar.png`; }}
                alt="user"
              />
              <p>1</p>
            </MsgItem>
            <MsgItem isMyself={false}>
              <img className="user-photo" src="https://images.unsplash.com/photo-1582152629442-4a864303fb96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="user" />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat officiis quidem
                voluptatem ipsum ipsa dolor iusto quod, perspiciatis quisquam iste. Officiis
                doloremque alias esse. Veniam unde dolor sed vero aspernatur pariatur officia
                eligendi dolorem quia molestias laboriosam ab, quos minima similique culpa quo
                ßperspiciatis eveniet doloribus aut! Nesciunt, ipsam a?
              </p>
            </MsgItem>
          </MsgList>
          <Footer>
            <Input />
            <SendMsgBtn type="button" anime>送出</SendMsgBtn>
            <ThumbsUpBtn type="button" anime>
              <span className="material-icons">thumb_up</span>
            </ThumbsUpBtn>
          </Footer>
        </ChatroomEl>
      ))}
      <ChatroomList unfold={isChatRoomListFold}>
        {
          chatroomIcons.map((chatroom) => (
            <ChatroomItem key={chatroom.id}>
              <img src="https://images.unsplash.com/photo-1603112579965-e24332cc453a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="user" />
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
