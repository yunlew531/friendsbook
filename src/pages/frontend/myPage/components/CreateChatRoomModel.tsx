import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Card from 'components/Card';
import Btn from 'components/Btn';
import FriendList from 'pages/frontend/MyPage/components/FriendList';
import { useAppDispatch, useAppSelector } from 'hooks';
import { openChatroom, openChatroomWindow, createChatroom } from 'slices/chatroomsSlice';
import toast from 'react-hot-toast';
import { useCreateChatroomMutation } from 'services/chatroom';
import { Socket } from 'socket.io-client';
import ChatroomList from './ChatroomList';

const Wrap = styled.div<{ isShow: boolean }>`
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Model = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModelMain = styled.div<{ chatroomType: ChatroomType }>`
  display: grid;
  grid-template-columns: repeat(${({ chatroomType }) => (
    chatroomType === 'oneToOne' || chatroomType === 'multiple' ? 1 : 2)}, 1fr);
  gap: 0 30px;
  margin: 30px 0;
`;

const TypeCard = styled(Card)<IThemeProps>`
  width: 200px;
  display: flex;
  justify-content: center;
  cursor: default;
  user-select: none;
  font-size: ${({ theme }) => theme.fontSizes.fs_2};
  align-items: center;
  box-shadow: ${({ theme }) => theme.shadow.s};
  height: 100px;
`;

const ModelTitle = styled.h3`
  margin-bottom: 10px;
`;

const CloseModelBtn = styled(Btn)<IThemeProps>`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 5px;
`;

const ModelFooter = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 16px;
`;

const CreateChatRoomBtn = styled(Btn)<IThemeProps>`
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white_100};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.fs_3};
  padding: 5px 10px;
  &.create-chatroom-btn {
    margin-right: 10px;
  }
`;

interface ICreateChatRoomModelProps {
  friends: IFriend[];
  closeModel: ()=> void;
  isShow: boolean;
  ws: Socket;
}

const CreateChatRoomModel: React.FC<ICreateChatRoomModelProps> = ({
  friends, isShow, closeModel, ws,
}) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.userInfo.profile);
  const chatrooms = useAppSelector((state) => state.chatrooms);
  const [users, setUsers] = useState<IFriend[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<IFriend[]>([]);
  const [selectedChatroom, setSelectedChatroom] = useState<IChatroom>();
  const [chatroomType, setChatroomType] = useState<ChatroomType>(null);
  const [chatroomsExcludeOpened, setChatroomsExcludeOpened] = useState<IChatroom[]>([]);
  const [createChatroomTrigger, createChatroomResult] = useCreateChatroomMutation();

  const resetModel = () => {
    setSelectedUsers([]);
    setUsers(friends);
    setChatroomType(null);
    setSelectedChatroom({});
  };

  const closeCreateChatroomModel = () => {
    closeModel();
    resetModel();
  };

  const addChatroom = () => {
    if (chatroomType === 'multiple-create') return;
    if (chatroomType === null) return;
    if (chatroomType === 'multiple') {
      if (!selectedChatroom?.id) {
        toast.error('請選擇聊天室');
        return;
      }
      dispatch(openChatroom(selectedChatroom));
      closeCreateChatroomModel();
    } else if (chatroomType === 'oneToOne') {
      const isChatroomExist = chatrooms.chatrooms.some(
        (chatroom) => chatroom.type === 1 && chatroom.members?.includes(selectedUsers[0].uid!),
      );
      if (!isChatroomExist) {
        enum Type {
          'oneToOne' = 1,
          'multiple' = 2,
        }
        createChatroomTrigger({
          members: [profile.uid!, ...selectedUsers.map((user) => user.uid!)],
          type: Type[chatroomType],
        });
      } else {
        // find exist chatroom in state.openedChatrooms,
        // and show chatroom window
        const hasOpenedChatroom = chatrooms.openedChatrooms.filter(
          (chatroom) => chatroom.type === 1 && chatroom.members?.includes(selectedUsers[0].uid!),
        );
        if (hasOpenedChatroom.length) {
          dispatch(openChatroomWindow(hasOpenedChatroom[0]));
          closeCreateChatroomModel();
        } else {
          // find exist chatroom in state.chatrooms,
          // add it in openedChatrooms and show chatroom window
          const chatroomData = chatrooms.chatrooms.filter(
            (chatroom) => chatroom.type === 1 && chatroom.members?.includes(selectedUsers[0].uid!),
          );
          dispatch(openChatroom(chatroomData[0]));
          closeCreateChatroomModel();
        }
      }
    }
  };

  useEffect(() => {
    // exclude chatrooms that opened
    const excludeOpenedChatrooms = chatrooms.chatrooms.filter(
      (chatroom) => {
        const isOpened = chatrooms.openedChatrooms.some(
          (openedChatroomData) => openedChatroomData.id === chatroom.id,
        );
        return !isOpened;
      },
    );
    setChatroomsExcludeOpened(excludeOpenedChatrooms);
  }, [chatrooms]);

  useEffect(() => {
    if (friends?.length) setUsers(friends);
  }, [friends]);

  useEffect(() => {
    const handleCreateChatroomApi = () => {
      const { isSuccess, isLoading, data } = createChatroomResult;
      if (!isSuccess || isLoading) return;
      dispatch(createChatroom(data.chatroom));
      ws.emit('join-chatroom', data.chatroom.id);
      closeCreateChatroomModel();
    };

    handleCreateChatroomApi();
  }, [createChatroomResult]);

  return (
    <Wrap isShow={isShow}>
      <Model>
        <ModelTitle>
          {chatroomType === 'multiple-create' && '建立聊天室'}
          {(chatroomType === 'oneToOne' || chatroomType === 'multiple') && '開啟聊天'}
        </ModelTitle>
        <CloseModelBtn
          type="button"
          anime
          onClick={closeCreateChatroomModel}
        >
          <span className="material-icons-outlined">close</span>
        </CloseModelBtn>
        <ModelMain chatroomType={chatroomType}>
          {chatroomType === null && (
          <>
            <TypeCard onClick={() => setChatroomType('oneToOne')}>一對一</TypeCard>
            <TypeCard onClick={() => setChatroomType('multiple')}>多人聊天室</TypeCard>
          </>
          )}
          {chatroomType === 'oneToOne'
          && (
          <FriendList
            friends={friends}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            chatroomType={chatroomType}
          />
          )}
          {/* exist multiple chatroom list */}
          {chatroomType === 'multiple'
            && (
            <ChatroomList
              chatrooms={chatroomsExcludeOpened}
              selectedChatroom={selectedChatroom}
              setSelectedChatroom={setSelectedChatroom}
            />
            )}
          {/* create new multiple chatroom */}
          {chatroomType === 'multiple-create' && (
            <>
              <FriendList
                friends={users}
                setFriends={setUsers}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                chatroomType={chatroomType}
              />
              <FriendList
                friends={selectedUsers}
                setFriends={setUsers}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                chatroomType={chatroomType}
                friendListType="selected"
              />
            </>
          )}
        </ModelMain>
        <ModelFooter>
          {chatroomType === 'multiple'
            && (
            <CreateChatRoomBtn
              className="create-chatroom-btn"
              type="button"
              onClick={() => setChatroomType('multiple-create')}
            >建立新聊天室
            </CreateChatRoomBtn>
            )}
          {chatroomType !== null && (
            <CreateChatRoomBtn
              type="button"
              anime
              onClick={() => addChatroom()}
            >
                {(chatroomType === 'oneToOne' || chatroomType === 'multiple') && '開啟'}
                {chatroomType === 'multiple-create' && '建立'}
            </CreateChatRoomBtn>
          )}
        </ModelFooter>
      </Model>
    </Wrap>
  );
};

export default CreateChatRoomModel;
