import styled from '@emotion/styled';
import React from 'react';
import Banner from './components/Banner';
import MessagesWall from './components/MessagesWall';
import ScenerySection from './components/ScenerySection';

const SubTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.p<IThemeProps>`
  color: ${({ theme }) => theme.color.black_100};
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
  </>
);

export default Home;
