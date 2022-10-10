import React from 'react';
import styled from '@emotion/styled';
import Message from './Message';

const Wrap = styled.div<IThemeProps>`
  position: relative;
  background-color: ${({ theme }) => theme.color.white_100};
  padding: 100px 150px;
`;

const Title = styled.h2<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.l};
  margin-bottom: 100px;
`;

const MessagesList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0 45px;
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
      <Title>熱絡聊天不間斷</Title>
      <MessagesList>
        {
          messages.map((message, idx) => (
            <Message
              key={message.content + idx.toString()}
              message={message}
            />
          ))
        }
      </MessagesList>
    </Wrap>
  );
};

export default MessagesWall;
