import React from 'react';
import styled from '@emotion/styled';

const EmptyBoxStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 3px;
    margin: 30px;
    filter: grayscale(1);
  }
`;

// eslint-disable-next-line arrow-body-style
const EmptyBox: React.FC = () => {
  return (
    <EmptyBoxStyle>
      <img src={`${process.env.PUBLIC_URL}/images/empty-box.png`} alt="empty box" />
    </EmptyBoxStyle>
  );
};
export default EmptyBox;
