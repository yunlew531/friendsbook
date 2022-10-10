import React from 'react';
import styled from '@emotion/styled';

const Wrap = styled.div<IThemeProps>`
  background-color: ${({ theme }) => theme.color.white_100};
`;

// eslint-disable-next-line arrow-body-style
const ScenerySection: React.FC = () => {
  return (
    <Wrap>
      <h1>ScenerySection</h1>
    </Wrap>
  );
};

export default ScenerySection;
