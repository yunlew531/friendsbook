import React from 'react';
import Banner from './components/Banner';
import MessagesWall from './components/MessagesWall';
import ScenerySection from './ScenerySection';

// eslint-disable-next-line arrow-body-style
const Home: React.FC = () => (
  <>
    <Banner />
    <MessagesWall />
    <ScenerySection />
  </>
);

export default Home;
