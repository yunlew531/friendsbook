import React from 'react';
import styled from '@emotion/styled';
import { Link, NavLink } from 'react-router-dom';
import Btn from 'components/Btn';
import Card from 'components/Card';
import Articles from '../components/Articles';

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

const Nav = styled.nav<IThemeProps>`
  display: flex;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.color.white_100};
  border-top: 1px solid ${({ theme }) => theme.color.gray_400};
  box-shadow: ${({ theme }) => theme.shadow.s};
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  a {
    padding: 20px 30px;
    color: ${({ theme }) => theme.color.black_300};
    text-decoration: none;
    background-color: ${({ theme }) => theme.color.white_100};
    &:hover {
      filter: brightness(0.98);
    }
    &.active{
      font-weight: 700;
      filter: brightness(0.97);
      box-shadow: inset ${({ theme }) => theme.shadow.s};
    }
  }
`;

const Container = styled.div`
  display: flex;
`;

const Aside = styled.aside`
  flex-shrink: 0;
  width: 450px;
  margin-right: 20px;
`;

const Introduce = styled(Card)<IThemeProps>`
  margin-bottom: 20px;
  .title {
    font-weight: 700; 
    font-size: ${({ theme }) => theme.fontSizes.fs_2};
    color: ${({ theme }) => theme.color.blue_300};
    margin-bottom: 10px;
  }
`;

const ImagesContainer = styled(Card)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
  img {
    height: 130px;
    border-radius: 3px;
  }
`;

const Main = styled.main`
  ul {
    margin: 0;
  }
`;

// eslint-disable-next-line arrow-body-style
const Fan: React.FC = () => {
  return (
    <Wrap>
      <Banner />
      <Header>
        <PhotoContainer>
          <Photo src="https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="person" />
        </PhotoContainer>
        <HeaderMain>
          <HeaderTextSection>
            <Title>偶像-布偶貓</Title>
            <FollowsQtyPanel>
              <Link to="/fan/:id/follows">10 人追蹤</Link>
              <span>，</span>
              <Link to="/fan/:id/following">正在追蹤 5 人</Link>
            </FollowsQtyPanel>
          </HeaderTextSection>
          <HeaderBtn type="button" anime>
            <span className="material-icons-round">question_answer</span>
            傳送訊息
          </HeaderBtn>
          <HeaderBtn type="button" anime>
            <span className="material-icons">add</span>
            追蹤
          </HeaderBtn>
          <HeaderBtn type="button" anime>
            <span className="material-icons">done</span>
            已追蹤
          </HeaderBtn>
        </HeaderMain>
      </Header>
      <Nav>
        <NavLink to="/fan/:id" className={({ isActive }) => (isActive ? 'active' : '')}>貼文</NavLink>
        <NavLink to="/fan/:id/about" className={({ isActive }) => (isActive ? 'active' : '')}>關於</NavLink>
        <NavLink to="/fan/:id/photo" className={({ isActive }) => (isActive ? 'active' : '')}>相片</NavLink>
        <NavLink to="/fan/:id/follows" className={({ isActive }) => (isActive ? 'active' : '')}>追蹤者</NavLink>
      </Nav>
      <Container>
        <Aside>
          <Introduce>
            <h4 className="title">簡介</h4>
            <p>偶像偶像偶像偶像偶像偶像偶像偶像偶像偶像偶像偶像</p>
          </Introduce>
          <ImagesContainer>
            <img src="https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=601&q=80" alt="" />
            <img src="https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=601&q=80" alt="" />
            <img src="https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=601&q=80" alt="" />
            <img src="https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=601&q=80" alt="" />
            <img src="https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=601&q=80" alt="" />
            <img src="https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=601&q=80" alt="" />
          </ImagesContainer>
        </Aside>
        <Main>
          <Articles />
        </Main>
      </Container>

    </Wrap>
  );
};

export default Fan;
