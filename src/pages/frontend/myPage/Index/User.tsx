import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Btn from 'components/Btn';
import Navbar from 'components/Navbar';
import { Outlet, useParams } from 'react-router-dom';
import { useLazyGetUserByUidQuery } from 'services/user';

const Wrap = styled.div`
  max-width: 1140px;
  margin: -21px auto 0;
`;

const Banner = styled.div`
  height: 400px;
  display: flex;
  align-items: end;
  background: url(https://images.unsplash.com/photo-1567606839022-1ee01c30cf77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80) no-repeat center;
  background-size: cover;
  border-radius: 0 0 3px 3px;
`;

const Header = styled.div<IThemeProps>`
  display: flex;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.color.white_100};
  box-shadow: ${({ theme }) => theme.shadow.s};
  padding: 0 50px;
`;

const PhotoContainer = styled.div`
  position: relative;
  width: 150px;
  margin-right: 30px;
`;

const Photo = styled.img<IThemeProps>`
  position: absolute;
  top: -75px;
  height: 150px;
  background-color: ${({ theme }) => theme.color.white_100};
  border-radius: 100%;
  border: 3px solid ${({ theme }) => theme.color.white_100};
`;

const HeaderMain = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  height: 85px;
`;

const HeaderTextSection = styled.div`
  margin-right: auto;
`;

const Title = styled.h2<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.s};
`;

const HeaderBtn = styled(Btn)<IThemeProps>`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.fs_3};
  color: ${({ theme }) => theme.color.white_100};
  background-color: ${({ theme }) => theme.color.secondary};
  border-radius: 5px;
  margin-right: 10px;
  padding: 5px 15px 5px 12px;
  &:last-of-type {
    margin-right: 0;
  }
  .material-icons, .material-icons-round {
    margin-right: 3px;
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
  }
`;

const User: React.FC = () => {
  const params = useParams();
  const paramUid = params.uid;
  const [getUserProfileByUidTrigger, getUserProfileByUidResult] = useLazyGetUserByUidQuery();
  const [user, setUser] = useState<IProfile>();

  const navLinks = useRef([
    {
      title: '貼文',
      to: `/${paramUid}`,
    },
    {
      title: '關於',
      to: `/${paramUid}/about`,
    },
    {
      title: '相片',
      to: `/${paramUid}/photos`,
    },
    {
      title: '社團',
      to: `/${paramUid}/clubs`,
    },
    {
      title: '說讚的內容',
      to: `/${paramUid}/fans`,
    },
  ]);

  useEffect(() => {
    if (paramUid) {
      getUserProfileByUidTrigger(paramUid);
    }
  }, [paramUid]);

  useEffect(() => {
    const handleGetUserByUid = () => {
      const { isSuccess, isFetching, data } = getUserProfileByUidResult;
      if (!isSuccess || isFetching) return;
      setUser(data.profile);
    };

    handleGetUserByUid();
  }, [getUserProfileByUidResult]);

  return (
    <Wrap>
      <Banner />
      <Header>
        <PhotoContainer>
          <Photo src="https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="person" />
        </PhotoContainer>
        <HeaderMain>
          <HeaderTextSection>
            <Title>{user?.nickname || user?.name}</Title>
          </HeaderTextSection>
          <HeaderBtn type="button" anime>
            <span className="material-icons-round">question_answer</span>
            傳送訊息
          </HeaderBtn>
        </HeaderMain>
      </Header>
      <Navbar links={navLinks.current} />
      <Outlet />
    </Wrap>
  );
};

export default User;
