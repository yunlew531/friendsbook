import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from 'hooks';
import useWebSocket from 'hooks/useWebSocket';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useGetFriendsByTokenQuery } from 'services/friend';
import { getFriends } from 'slices/friendsSlice';
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
  padding: 92px 30px 20px;
`;

const MyPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const friends = useAppSelector((state) => state.friends.friends);
  const { data: FriendsResult, isSuccess: isGetFriendsSuccess } = useGetFriendsByTokenQuery();
  const [isModelShow, setIsModelShow] = useState(false);
  const closeCreateChatRoomModel = () => setIsModelShow(false);
  const showCreateChatRoomModel = () => setIsModelShow(true);
  const { ws } = useWebSocket(process.env.REACT_APP_SOCKET_URL!);

  useEffect(() => {
    const handleGetFriendsApi = () => {
      if (!FriendsResult) return;
      dispatch(getFriends(FriendsResult.friends));
    };

    handleGetFriendsApi();
  }, [isGetFriendsSuccess]);

  return (
    <Wrap>
      <Chatroom ws={ws} showCreateChatRoomModel={showCreateChatRoomModel} />
      <CreateChatRoomModel
        isShow={isModelShow}
        closeModel={closeCreateChatRoomModel}
        friends={friends.connected}
        ws={ws}
      />
      <Header />
      <SideBar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </Wrap>
  );
};

export default MyPage;
