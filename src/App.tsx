import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { useRoutes } from 'react-router-dom';
import theme from 'styleSheets/theme';
import styled from '@emotion/styled';
import { Toaster } from 'react-hot-toast';
import { useAppDispatch } from 'hooks';
import { getProfile } from 'slices/userInfoSlice';
import { useLazyGetUserByUidQuery } from 'services/user';
import Cookies from 'js-cookie';
import routes from './routes';

const Wrap = styled.div`
  background-color: ${theme.bgColor};
`;

const App: React.FC = () => {
  const element = useRoutes(routes);
  const dispatch = useAppDispatch();
  const [getUserByUidTrigger, userResult] = useLazyGetUserByUidQuery();

  useEffect(() => {
    const checkLogin = () => {
      const hasToken = Cookies.get('Friendsbook');
      if (!hasToken) return;
      getUserByUidTrigger('owner');
    };

    checkLogin();
  }, []);

  useEffect(() => {
    if (userResult.isSuccess) { dispatch(getProfile(userResult.data.profile)); }
  }, [userResult]);

  // TODO: 切換主題色功能
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentTheme, setCurrentTheme] = useState(theme);

  return (
    <ThemeProvider theme={currentTheme}>
      <Wrap>
        <Toaster />
        {element}
      </Wrap>
    </ThemeProvider>
  );
};

export default App;
