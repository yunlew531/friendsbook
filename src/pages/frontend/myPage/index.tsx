import React from 'react';
import Header from './components/Header';
import SideBar from './components/Sidebar';

// eslint-disable-next-line arrow-body-style
const MyPage: React.FC = () => {
  return (
    <>
      <Header />
      <SideBar />
    </>
  );
};

export default MyPage;
