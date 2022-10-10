import styled from '@emotion/styled';
import React from 'react';

interface IContainerProps {
  align?: 'right' | 'left';
}

const Container = styled.li<IThemeProps & IContainerProps>`
  position: relative;
  background: ${({ theme }) => theme.color.gray_400};
  border-radius: ${({ align }) => (align === 'left' ? '30px 30px 30px 0' : '30px 30px 0 30px')};
  padding: 50px;
  margin: ${({ align }) => (align === 'left' ? '0 auto 50px 0' : '0 0 50px auto')};
  transform: scale(0);
  transform-origin: ${({ align }) => (align === 'left' ? 'left bottom' : 'right bottom')};
  animation: messageScale .3s ease-in-out forwards;
  @keyframes messageScale {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: ${({ align }) => (align === 'left' ? '-15px' : 'auto')};
    right: ${({ align }) => (align === 'right' ? '-15px' : 'auto')};
    clip-path: ${({ align }) => (align === 'left' ? 'polygon(100% 0, 0 100%, 100% 100%)' : 'polygon(0 0, 0 100%, 100% 100%)')};
    width: 15px;
    height: 15px;
    background-color: ${({ theme }) => theme.color.gray_400};
  }
`;

const Content = styled.p<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.fs_1};
`;

interface IMessageProps {
  message: IMessage;
}

// eslint-disable-next-line arrow-body-style
const Message: React.FC<IMessageProps> = ({ message: { content, align } }) => {
  return (
    <Container align={align}>
      <Content>{content}</Content>
    </Container>
  );
};

export default Message;
