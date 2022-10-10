import React from 'react';
import styled from '@emotion/styled';
import Message from './Message';

const Wrap = styled.div<IThemeProps>`
  position: relative;
  background-color: ${({ theme }) => theme.color.white_100};
`;

const TitleContainer = styled.div`
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

const MessagesContainer = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0 180px;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
`;

// eslint-disable-next-line arrow-body-style
const MessagesWall: React.FC = () => {
  const messages: IMessage[] = [
    {
      content: '測試測試測試測試測試測試測試',
      align: 'left',
    },
    {
      content: '測試測試測試測試測試測試測試',
      align: 'left',
    },
    {
      content: '測試測試測試測試測試測試測試',
      align: 'left',
    },
    {
      content: '測試測試測試測試測試測試測試',
      align: 'right',
    },
    {
      content: '測試測試測試測試測試測試測試',
      align: 'right',
    },
    {
      content: '測試測試測試測試測試測試測試',
      align: 'right',
    },
    {
      content: '測試測試測試測試測試測試測試',
      align: 'left',
    },
    {
      content: '測試測試測試測試測試測試測試',
      align: 'left',
    },
    {
      content: '測試測試測試測試測試測試測試',
      align: 'left',
    },
  ];

  return (
    <Wrap>
      <BackgroundImage src={`${process.env.PUBLIC_URL}/images/message-wall-bg.jpeg`} />
      <TitleContainer>
        <Title>在 Friendsbook 你可以?</Title>
      </TitleContainer>
      <MessagesContainer>
        {
          messages.map((message, idx) => (
            <Message
              key={message.content + idx.toString()}
              message={message}
            />
          ))
        }
      </MessagesContainer>
    </Wrap>
  );
};

export default MessagesWall;
