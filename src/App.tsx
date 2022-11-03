import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { useRoutes } from 'react-router-dom';
import theme from 'styleSheets/theme';
import styled from '@emotion/styled';
import { Toaster } from 'react-hot-toast';
import { useCheckLoginQuery } from 'services/account';
import { useAppDispatch } from 'hooks';
import { login } from 'slices/userInfoSlice';
import routes from './routes';

const Wrap = styled.div`
  background-color: ${theme.bgColor};
`;

const App: React.FC = () => {
  const element = useRoutes(routes);
  const dispatch = useAppDispatch();
  const { data, isSuccess } = useCheckLoginQuery(null);

  useEffect(() => {
    if (isSuccess) {
      dispatch(login({
        uid: data.uid,
        isLogin: true,
      }));
    }
  }, [data]);

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
