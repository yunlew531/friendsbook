import { useAppSelector } from 'hooks';
import React, { PropsWithChildren } from 'react';

const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const userInfo = useAppSelector((state) => state.userInfo);

  return (
    <>
      {userInfo.isLogin && children}
      <div />
    </>
  );
};

export default PrivateRoute;
