import React from 'react';
import styled from '@emotion/styled';
import Card from 'components/Card';
import UserCard from 'components/UserCard';

const Title = styled.h2<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.fs_2};
  margin-bottom: 10px;
  &.following {
    margin-top: 16px;
  }
`;

const UserList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  list-style: none;
  margin: 0;
  li {
    margin: 0;
  }
`;

// eslint-disable-next-line arrow-body-style
const FanFollows: React.FC = () => {
  return (
    <Card>
      <Title>追蹤者</Title>
      <UserList>
        {
          // eslint-disable-next-line react/no-array-index-key
          new Array(5).fill(null).map((item, idx) => <UserCard key={idx} />)
        }
      </UserList>
      <Title className="following">正在追蹤</Title>
      <UserList>
        {
          // eslint-disable-next-line react/no-array-index-key
          new Array(5).fill(null).map((item, idx) => <UserCard key={idx} />)
        }
      </UserList>
    </Card>
  );
};

export default FanFollows;
