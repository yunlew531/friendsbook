import styled from '@emotion/styled';
import React from 'react';
import Banner from './components/Banner';
import MessagesWall from './components/MessagesWall';
import ScenerySection from './components/ScenerySection';
import FansPageSection from './FansPageSection';

const SubTitleContainer = styled.div<IThemeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.white_100};
`;

const Title = styled.p<IThemeProps>`
  font-size: 40px;
  font-weight: 700;
`;

// eslint-disable-next-line arrow-body-style
const Home: React.FC = () => (
  <>
    <Banner />
    <SubTitleContainer>
      <Title>在 Friendsbook 你可以?</Title>
    </SubTitleContainer>
    <MessagesWall />
    <ScenerySection />
    <FansPageSection />
  </>
);

export default Home;
