import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Card from 'components/Card';
import Btn from 'components/Btn';
import FriendList from 'pages/frontend/Index/components/FriendList';
import { useAppDispatch, useAppSelector } from 'hooks';
import { openChatroom } from 'slices/chatroomsSlice';
import toast from 'react-hot-toast';
import ChatroomList from 'pages/frontend/Index/components/ChatroomList';
import useChatrooms from 'hooks/useChatrooms';

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

const NameGroup = styled.div<IThemeProps>`
  display: flex;
  align-items: center;
  h4 {
    margin-right: 10px;
  }
  input {
    width: 200px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.color.gray_300};
    padding: 5px 10px;
    &:focus-visible {
      border: 1px solid transparent;
      outline: 1px solid ${({ theme }) => theme.color.primary};
    }
  }
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
  chatroomType: ChatroomType;
  setChatroomType: React.Dispatch<React.SetStateAction<ChatroomType>>;
  users: IFriend[];
  setUsers: React.Dispatch<React.SetStateAction<IFriend[]>>;
  selectedUsers: IFriend[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<IFriend[]>>;
}

const CreateChatRoomModel: React.FC<ICreateChatRoomModelProps> = ({
  friends, isShow, closeModel, chatroomType, setChatroomType, selectedUsers, setSelectedUsers,
  users, setUsers,
}) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.userInfo.profile);
  const chatrooms = useAppSelector((state) => state.chatrooms);
  const { createChatroom, openMsgWindowByUid, createChatroomResult } = useChatrooms();
  const [selectedChatroom, setSelectedChatroom] = useState<IChatroom>();
  const [multiplePeopleChatrooms, setMultiplePeopleChatrooms] = useState<IChatroom[]>([]);
  const [roomName, setRoomName] = useState('');

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
    if (chatroomType === null) return;
    if (chatroomType === 'multiple') {
      if (!selectedChatroom?.id) {
        toast.error('??????????????????');
        return;
      }
      dispatch(openChatroom({ chatroom: selectedChatroom, uid: profile.uid! }));
      closeCreateChatroomModel();
    } else if (chatroomType === 'oneToOne') {
      const selectedUser = selectedUsers[0].uid;
      if (!selectedUser) {
        toast.error('???????????????');
        return;
      }
      openMsgWindowByUid(selectedUser);
      closeCreateChatroomModel();
    } else if (chatroomType === 'multipleCreate') {
      const chatroomOps: ICreateChatroomOps = {
        members: [...selectedUsers.map((user) => user.uid!)],
        roomName,
      };
      createChatroom(chatroomOps);
    }
  };

  useEffect(() => {
    // exclude chatrooms that opened
    const multiplePeopleChatroomsData = chatrooms.chatrooms.filter(
      (chatroom) => chatroom.type === 2,
    );
    setMultiplePeopleChatrooms(multiplePeopleChatroomsData);
  }, [chatrooms]);

  useEffect(() => {
    if (friends?.length) setUsers(friends);
  }, [friends]);

  useEffect(() => {
    if (createChatroomResult.isSuccess) closeCreateChatroomModel();
  }, [createChatroomResult]);

  return (
    <Wrap isShow={isShow}>
      <Model>
        <ModelTitle>
          {chatroomType === 'multipleCreate' && '???????????????'}
          {(chatroomType === 'oneToOne' || chatroomType === 'multiple') && '????????????'}
        </ModelTitle>
        {chatroomType === 'multipleCreate'
            && (
              <NameGroup>
                <h4>???????????????</h4>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value)}
                />
              </NameGroup>
            )}
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
            <TypeCard onClick={() => setChatroomType('oneToOne')}>?????????</TypeCard>
            <TypeCard onClick={() => setChatroomType('multiple')}>???????????????</TypeCard>
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
              chatrooms={multiplePeopleChatrooms}
              selectedChatroom={selectedChatroom}
              setSelectedChatroom={setSelectedChatroom}
            />
            )}
          {/* create new multiple chatroom */}
          {chatroomType === 'multipleCreate' && (
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
              onClick={() => setChatroomType('multipleCreate')}
            >??????????????????
            </CreateChatRoomBtn>
            )}
          {chatroomType !== null && (
            <CreateChatRoomBtn
              type="button"
              anime
              onClick={() => addChatroom()}
            >
                {(chatroomType === 'oneToOne' || chatroomType === 'multiple') && '??????'}
                {chatroomType === 'multipleCreate' && '??????'}
            </CreateChatRoomBtn>
          )}
        </ModelFooter>
      </Model>
    </Wrap>
  );
};

export default CreateChatRoomModel;
