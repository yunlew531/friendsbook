import styled from '@emotion/styled';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Chatroom from './components/Chatroom';
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

// eslint-disable-next-line arrow-body-style
const MyPage: React.FC = () => {
  return (
    <Wrap>
      <Chatroom />
      <Header />
      <SideBar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </Wrap>
  );
};

export default MyPage;
