import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Card from 'components/Card';
import Btn from 'components/Btn';
import FriendList from 'pages/frontend/MyPage/components/FriendList';

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
  grid-template-columns: repeat(${({ chatroomType }) => (chatroomType === 'oneToOne' ? 1 : 2)}, 1fr);
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
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const CreateChatRoomBtn = styled(Btn)<IThemeProps>`
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white_100};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.fs_3};
  margin-left: auto;
  padding: 5px 10px;
`;

interface ICreateChatRoomModelProps {
  friends: IFriend[];
  closeModel: ()=> void;
  isShow: boolean;
}

const CreateChatRoomModel: React.FC<ICreateChatRoomModelProps> = ({
  friends, isShow, closeModel,
}) => {
  const [users, setUsers] = useState<IFriend[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<IFriend[]>([]);
  const [chatroomType, setChatroomType] = useState<ChatroomType>(null);

  const resetModel = () => {
    setSelectedUsers([]);
    setUsers(friends);
    setChatroomType(null);
  };

  useEffect(() => {
    if (friends?.length) setUsers(friends);
  }, [friends]);

  return (
    <Wrap isShow={isShow}>
      <Model>
        <ModelTitle>
          {chatroomType === 'multiple' && '建立聊天室'}
          {chatroomType === 'oneToOne' && '開啟聊天'}
        </ModelTitle>
        <CloseModelBtn
          type="button"
          anime
          onClick={() => {
            closeModel();
            resetModel();
          }}
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
          {chatroomType === 'multiple' && (
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
          {chatroomType !== null && (
            <CreateChatRoomBtn type="button" anime>
              {chatroomType === 'oneToOne' && '開啟'}
              {chatroomType === 'multiple' && '建立'}
            </CreateChatRoomBtn>
          )}
        </ModelFooter>
      </Model>
    </Wrap>
  );
};

export default CreateChatRoomModel;
