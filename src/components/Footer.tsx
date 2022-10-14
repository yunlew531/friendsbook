import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Wrap = styled.div<IThemeProps>`
  background-color: ${({ theme }) => theme.color.black_500};
`;

const LinkContainer = styled.div<IThemeProps>`
  display: flex;
  justify-content: center;
  border-top: 1px solid rgba(149, 149, 153, 0.2);
  border-bottom: 1px solid rgba(149, 149, 153, 0.2);
  padding: 100px;
`;

const FansPageAndGroupLink = styled(Link)`
  position: relative;
  display: flex;
  justify-content: space-between;
  max-width: 500px;
  width: 100%;
  height: 200px;
  text-decoration: none;
  border-radius: 10px;
  transition: background-size .3s ease-in-out;
  overflow: hidden;
  padding: 30px;
  &:hover {
    background-size: 105%;
    .link-arrow {
      width: 100%;
      height: 100%;
      right: 0;
      bottom: 0;
      border-radius: 0px;
    }
  }
`;

const FansPageLink = styled(FansPageAndGroupLink)`
  background: url(${process.env.PUBLIC_URL}/images/fanspage-link.jpeg) no-repeat center;
  background-size: 100%;
  margin-right: 50px;
`;

const GroupLink = styled(FansPageAndGroupLink)`
  background: url(${process.env.PUBLIC_URL}/images/group-link.jpeg) no-repeat center;
  background-size: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LinkTitle = styled.h3<IThemeProps>`
  color: ${({ theme }) => theme.color.white_100};
  font-size: ${({ theme }) => theme.fontSizes.fs_1};
`;

const LinkDesc = styled.p<IThemeProps>`
  color: ${({ theme }) => theme.color.white_100};
  font-size: ${({ theme }) => theme.fontSizes.fs_4};
`;

const LinkArrowStyle = styled.div<IThemeProps>`
  position: absolute;
  bottom: 30px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 100%;
  transition: .3s ease-in-out;
  .arrow-icon {
    color: ${({ theme }) => theme.color.white_100};
    font-size: ${({ theme }) => theme.fontSizes.s};
    font-weight: 700;
  }
`;

const Main = styled.div<IThemeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.white_100};
  padding: 50px;
`;

const IconContainer = styled.div<IThemeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.s};
  font-family: 'Exo 2', sans-serif;
  margin-right: 30px;
  img {
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }
`;

// eslint-disable-next-line arrow-body-style
const Footer: React.FC = () => {
  return (
    <Wrap>
      <LinkContainer>
        <FansPageLink to="/">
          <ContentContainer>
            <LinkTitle>粉絲專頁</LinkTitle>
            <LinkDesc>追蹤您感興趣的事物</LinkDesc>
          </ContentContainer>
          <LinkArrowStyle className="link-arrow">
            <span className="material-icons-outlined arrow-icon">north_east</span>
          </LinkArrowStyle>
        </FansPageLink>
        <GroupLink to="/">
          <ContentContainer>
            <LinkTitle>社團</LinkTitle>
            <LinkDesc>與志同道合的朋友一起討論</LinkDesc>
          </ContentContainer>
          <LinkArrowStyle className="link-arrow">
            <span className="material-icons-outlined arrow-icon">north_east</span>
          </LinkArrowStyle>
        </GroupLink>
      </LinkContainer>
      <Main>
        <IconContainer>
          <img src={`${process.env.PUBLIC_URL}/images/friends.png`} alt="friends icon" />
          <p>Friendsbook</p>
        </IconContainer>
        <p>© 2022 All rights reserved</p>
      </Main>
    </Wrap>
  );
};

export default Footer;
