import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Btn from 'components/Btn';

const Wrap = styled.li<IThemeProps>`
display: flex;
align-items: center;
border: 1px solid ${({ theme }) => theme.color.gray_400};
border-radius: 5px;
padding: 10px;
margin-bottom: 10px;
`;

const UserCardPhoto = styled.img<IThemeProps>`
flex-shrink: 0;
width: 50px;
height: 50px;
border-radius: 100%;
box-shadow: ${({ theme }) => theme.shadow.s};
transition: filter .1s ease-in-out;
margin-right: 10px;
&:hover {
  filter: brightness(0.9);
}
`;

const UserCardContent = styled.div<IThemeProps>`
flex-grow: 1;
a {
  text-decoration: none;
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.fontSizes.fs_2};
}
.member-desc {
  color: ${({ theme }) => theme.color.gray_300};
  font-size: ${({ theme }) => theme.fontSizes.fs_4};
}
`;

const UserCardBtn = styled(Btn)<IThemeProps>`
display: flex;
align-items: center;
border: 1px solid ${({ theme }) => theme.color.gray_100};
padding: 5px 10px;
border-radius: 5px;
background-color: ${({ theme }) => theme.color.white_100};
margin-right: 10px;
.material-icons-round {
  font-size: ${({ theme }) => theme.fontSizes.fs_3};
  margin-right: 3px;
}
`;

// eslint-disable-next-line arrow-body-style
const UserCard: React.FC = () => {
  return (
    <Wrap>
      <UserCardPhoto src="https://images.unsplash.com/photo-1557002665-c552e1832483?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="username" />
      <UserCardContent>
        <Link to="/user/uid">Tom Tom</Link>
        <p className="member-desc">Lorem ipsum dolor sit amet.</p>
      </UserCardContent>
      <UserCardBtn anime>
        <span className="material-icons-round">add</span>
        加好友
      </UserCardBtn>
      <UserCardBtn anime>
        <span className="material-icons-round">chat</span>
        傳訊息
      </UserCardBtn>
    </Wrap>
  );
};

export default UserCard;
