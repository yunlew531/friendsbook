import React from 'react';
import styled from '@emotion/styled';
import { Link, Outlet } from 'react-router-dom';
import Btn from 'components/Btn';
import Navbar from 'components/Navbar';

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
`;

const Header = styled.div<IThemeProps>`
  display: flex;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.color.white_100};
  box-shadow: ${({ theme }) => theme.shadow.s};
  padding: 0 50px 5px;
`;

const PhotoContainer = styled.div`
  position: relative;
  width: 200px;
  margin-right: 30px;
`;

const Photo = styled.img<IThemeProps>`
  position: absolute;
  top: -100px;
  height: 200px;
  background-color: ${({ theme }) => theme.color.white_100};
  border-radius: 100%;
  border: 3px solid ${({ theme }) => theme.color.white_100};
`;

const HeaderMain = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  margin-top: 5px;
  padding: 20px 0;
`;

const HeaderTextSection = styled.div`
  margin-right: auto;
`;

const Title = styled.h2<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.s};
  margin-bottom: 5px;
`;

const FollowsQtyPanel = styled.div<IThemeProps>`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.gray_500};
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.color.gray_500};
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
    padding: 0;
    &:hover {
      text-decoration: underline;
    }
  }
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

const Fan: React.FC = () => {
  const navLinks: INavLink[] = [
    {
      title: '??????',
      to: '/fan/:id',
    },
    {
      title: '??????',
      to: '/fan/:id/about',
    },
    {
      title: '??????',
      to: '/fan/:id/photos',
    },
    {
      title: '?????????',
      to: '/fan/:id/follows',
    },
  ];

  return (
    <Wrap>
      <Banner />
      <Header>
        <PhotoContainer>
          <Photo src="https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="person" />
        </PhotoContainer>
        <HeaderMain>
          <HeaderTextSection>
            <Title>??????-?????????</Title>
            <FollowsQtyPanel>
              <Link to="/fan/:id/follows">10 ?????????</Link>
              <span>???</span>
              <Link to="/fan/:id/following">???????????? 5 ???</Link>
            </FollowsQtyPanel>
          </HeaderTextSection>
          <HeaderBtn type="button" anime>
            <span className="material-icons-round">question_answer</span>
            ????????????
          </HeaderBtn>
          <HeaderBtn type="button" anime>
            <span className="material-icons">add</span>
            ??????
          </HeaderBtn>
          <HeaderBtn type="button" anime>
            <span className="material-icons">done</span>
            ?????????
          </HeaderBtn>
        </HeaderMain>
      </Header>
      <Navbar links={navLinks} />
      <Outlet />
    </Wrap>
  );
};

export default Fan;
