import styled from '@emotion/styled';
import React from 'react';
import Sidebar from 'pages/frontend/Index/Index/Settings/components/Sidebar';
import { Outlet } from 'react-router-dom';

const Wrap = styled.div`
  display: flex;
  margin: -21px -30px -70px;
`;

const Main = styled.main<IThemeProps>`
  height: calc(100vh - 71px);
  flex-grow: 1;
  background-color: ${({ theme }) => theme.color.white_100};
  box-shadow: ${({ theme }) => theme.shadow.m};
  padding: 30px;
`;

// eslint-disable-next-line arrow-body-style
const Settings: React.FC = () => {
  return (
    <Wrap>
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </Wrap>
  );
};

export default Settings;
