import React from 'react';
import styled from '@emotion/styled';

const Wrap = styled.ul<IThemeProps>`
  width: 350px;
  min-height: 300px;
  list-style: none;
  background-color: ${({ theme }) => theme.color.gray_300};
  border-radius: 8px;
  padding: 16px;
  margin: 0;
`;

const ChatroomItem = styled.li<IThemeProps>`
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

const ChatroomItemPhoto = styled.div<IThemeProps>`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  overflow: hidden;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: 1px solid ${({ theme }) => theme.color.white_100};
  }
`;

const ChatroomItemMain = styled.div<IThemeProps>`
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

interface IChatroomListProps {
  chatrooms: IChatroom[];
  selectedChatroom?: IChatroom;
  setSelectedChatroom: React.Dispatch<React.SetStateAction<IChatroom | undefined>>;
}

const ChatroomList: React.FC<IChatroomListProps> = ({
  chatrooms,
  selectedChatroom, setSelectedChatroom,
// eslint-disable-next-line arrow-body-style
}) => {
  return (
    <Wrap>
      {chatrooms?.map((chatroom) => (
        <ChatroomItem key={chatroom.id} onClick={() => setSelectedChatroom(chatroom)}>
          <ChatroomItemPhoto>
            <img
              src={chatroom.avatar_url || `${process.env.PUBLIC_URL}/images/group.png`}
              onError={({ currentTarget }) => { currentTarget.src = `${process.env.PUBLIC_URL}/images/group.png`; }}
              alt={`user ${chatroom.name}`}
            />
          </ChatroomItemPhoto>
          <ChatroomItemMain>
            <div>
              <p className="link-name">{chatroom.name}</p>
              <p className="last-seen">人數: {chatroom.members?.length}</p>
            </div>
          </ChatroomItemMain>
          {selectedChatroom?.id === chatroom.id
            && <span className="material-icons-outlined done-icon">done</span>}
        </ChatroomItem>
      ))}
    </Wrap>
  );
};

ChatroomList.defaultProps = {
  selectedChatroom: undefined,
};

export default ChatroomList;
