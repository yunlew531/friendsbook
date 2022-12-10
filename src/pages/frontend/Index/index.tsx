import React, { useEffect, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Outlet } from 'react-router-dom';
import { useGetFriendsByTokenQuery } from 'services/friend';
import { getFriends } from 'slices/friendsSlice';
import PrivateRoute from 'context/PrivateRoute';
import { useWebSocket } from 'context/WebSocketProvider';
import Chatroom from './components/Chatroom';
import CreateChatRoomModel from './components/CreateChatRoomModel';
import Header from './components/Header';
import SideBar from './components/Sidebar';

const Wrap = styled.div`
  position: relative;
`;

const MainContainer = styled.div`
  background-color: transparent;
  margin-left: 75px;
  padding: 92px 30px 70px;
`;

const Index: React.FC = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.userInfo);
  const friends = useAppSelector((state) => state.friends.friends);
  const { data: FriendsResult, isSuccess: isGetFriendsSuccess } = useGetFriendsByTokenQuery(
    userInfo.isLogin ? undefined : skipToken,
  );
  const ws = useWebSocket();
  const [isModelShow, setIsModelShow] = useState(false);
  const [chatroomType, setChatroomType] = useState<ChatroomType>(null);
  const [users, setUsers] = useState<IFriend[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<IFriend[]>([]);

  const closeCreateChatRoomModel = () => setIsModelShow(false);
  const showCreateChatRoomModel = () => setIsModelShow(true);

  useEffect(() => {
    const handleGetFriendsApi = () => {
      if (!FriendsResult) return;
      dispatch(getFriends(FriendsResult.friends));
    };

    handleGetFriendsApi();
  }, [isGetFriendsSuccess]);

  useEffect(() => {
    let lastSeenTimeout: NodeJS.Timeout;
    const updateLastSeenPerMin = () => {
      if (!userInfo.profile.uid || !friends.connected[0]) return;
      lastSeenTimeout = setTimeout(() => {
        ws.emit('friends-last-seen', userInfo.profile.uid);
      }, 60 * 1000);
    };

    updateLastSeenPerMin();

    return () => {
      clearTimeout(lastSeenTimeout);
    };
  }, [friends.connected]);

  return (
    <Wrap>
      <PrivateRoute>
        <Chatroom
          setChatroomType={setChatroomType}
          showCreateChatRoomModel={showCreateChatRoomModel}
          setSelectedUsers={setSelectedUsers}
          setUsers={setUsers}
        />
        <CreateChatRoomModel
          isShow={isModelShow}
          closeModel={closeCreateChatRoomModel}
          friends={friends.connected}
          chatroomType={chatroomType}
          setChatroomType={setChatroomType}
          users={users}
          setUsers={setUsers}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
        <SideBar />
      </PrivateRoute>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </Wrap>
  );
};

export default Index;
