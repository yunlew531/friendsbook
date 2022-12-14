import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';

const Wrap = styled.div<IThemeProps>`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.white_100};
  overflow: hidden;
`;

const Aside = styled.aside`
  width: 250px;
`;

const AsideTitleContainer = styled.div<IThemeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  background-color: ${({ theme }) => theme.color.yellow_100};
`;

const AsideTitle = styled.h1`
  font-size: 26px;
  font-family: 'Exo 2', sans-serif;
  text-transform: Uppercase;
`;

const AsideNav = styled.nav<IThemeProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  height: 50%;
  text-align: end;
`;

const MainSection = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainSectionContent = styled.div<IThemeProps>`
  position: absolute;
  top: 150px;
  right: 0;
  font-family: 'Exo 2', sans-serif;
  color: ${({ theme }) => theme.color.black_400};
  z-index: 1;
  `;

const MainSectionTitle = styled.p<IThemeProps>`
  text-transform: uppercase;
  font-size: 100px;
  margin-bottom: 20px;
`;

const MainSectionSubTitle = styled.p<IThemeProps>`
  width: 250px;
  color: ${({ theme }) => theme.color.gray_300};
  font-weight: 700;
  margin-left: auto;
`;

const MainSectionCircle = styled.div<IThemeProps>`
  position: relative;
  height: 800px;
  width: 800px;
  border-radius: 100%;
  border: 2px ${({ theme }) => theme.color.gray_100} solid;
  overflow: hidden;
  background: url(${process.env.PUBLIC_URL}/images/photo-banner.jpeg) no-repeat center;
  background-size: cover;
  &::before {
    content: '';
    position: absolute;
    top: 15px;
    bottom: 15px;
    left: 15px;
    right: 15px;
    border-radius: 100%;
    border: 15px solid;
    border-color: ${({ theme }) => theme.color.yellow_100} transparent;
    animation: borderCircling 10s linear infinite;
    @keyframes borderCircling {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(-360deg);
      }
    }
  }
`;

const LoginBtnContainer = styled.div`
  position: relative;
  max-width: 300px;
  width: 100%;
  `;

const AsideLink = styled(Link)<IThemeProps>`
  position: relative;
  font-size: ${({ theme }) => theme.fontSizes.fs_1};
  text-decoration: none;
  font-weight: 700;
  height: 45px;
  transition: color .2s, background-color .3s;
  overflow: hidden;
  span {
    position: absolute;
    display: block;
    right: 10px;
    top: 50%;
    color: ${({ theme }) => theme.color.black_200};
    transition: .3s transform ease-out, .2s color linear;
    transform: translateY(-50%);
  }
  &::before {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.color.black_300};
    border-radius: 3px;
    transform: translateX(-100%);
    transition: .2s ease-out;
  }
  &:hover {
    span {
      color: ${({ theme }) => theme.color.white_100};
      transform: translateX(5px) translateY(-50%);
    }
    &::before {
      transform: translateX(0);
    }
  }
`;

const LoginAndSignInLink = styled(Link)<IThemeProps>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 25%;
  font-size: ${({ theme }) => theme.fontSizes.fs_1};
  background-color: ${({ theme }) => theme.color.yellow_100};
  border-radius: 5px 0 0 5px;
  padding: 30px;
  text-decoration: none;
  transition: .2s transform ease-out, filter .2s ease-out;
  &:hover {
    transform: translateX(5px);
    filter: brightness(0.97);
  }
`;

// eslint-disable-next-line arrow-body-style
const Banner: React.FC = () => {
  return (
    <Wrap>
      <Aside>
        <AsideTitleContainer>
          <AsideTitle>friends<br />book</AsideTitle>
        </AsideTitleContainer>
        <AsideNav>
          <AsideLink to="/home"><span>??????</span></AsideLink>
          <AsideLink to="/"><span>lorem</span></AsideLink>
          <AsideLink to="/"><span>lorem</span></AsideLink>
        </AsideNav>
      </Aside>
      <MainSection>
        <MainSectionContent>
          <MainSectionTitle>friends books</MainSectionTitle>
          <MainSectionSubTitle>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis, ob caecati.
          </MainSectionSubTitle>
        </MainSectionContent>
        <MainSectionCircle />
      </MainSection>
      <LoginBtnContainer>
        { /* TODO: to login page */}
        <LoginAndSignInLink to="/home">???????????? / ??????</LoginAndSignInLink>
      </LoginBtnContainer>
    </Wrap>
  );
};

export default Banner;
