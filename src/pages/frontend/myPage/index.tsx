import styled from '@emotion/styled';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import SideBar from './components/Sidebar';

const MainContainer = styled.div`
  background-color: transparent;
  margin-left: 75px;
  padding: 22px 30px;
`;

// eslint-disable-next-line arrow-body-style
const MyPage: React.FC = () => {
  return (
    <>
      <Header />
      <SideBar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
};

export default MyPage;
