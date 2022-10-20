import React from 'react';
import styled from '@emotion/styled';

const Wrap = styled.aside<IThemeProps>`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.cardColor};
`;

const FriendsIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 15px;
`;

const AsideList = styled.ul`
  list-style: none;
  margin-top: 38px;
`;

const AsideListItem = styled.li<IThemeProps>`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.cardColor};
  transition: filter .2s ease-in-out;
  padding: 15px;
  .material-icons-outlined {
    cursor: default;
  }
  &:hover {
    filter: brightness(0.95);
  }
  &:active {
    filter: brightness(0.9);
  }
`;

const SettingBtn = styled.button<IThemeProps>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.blue_200};
  border-radius: 100%;
  box-shadow: ${({ theme }) => theme.shadow.m};
  border: 1px solid ${({ theme }) => theme.color.white_100};
  padding: 10px;
  margin: auto 0 15px;
  transition: border-color .2s ease-in-out, transform .1s ease-in-out;
  &:hover {
    border: 1px solid ${({ theme }) => theme.color.primary};
  }
  &:active {
    transform: scale(0.95);
  }
`;

// eslint-disable-next-line arrow-body-style
const SideBar: React.FC = () => {
  return (
    <Wrap>
      <FriendsIcon src={`${process.env.PUBLIC_URL}/images/friends.png`} />
      <AsideList>
        <AsideListItem>
          <span className="material-icons-outlined">calendar_month</span>
        </AsideListItem>
        <AsideListItem>
          <span className="material-icons-outlined">bookmark</span>
        </AsideListItem>
        <AsideListItem>
          <span className="material-icons-outlined">sms</span>
        </AsideListItem>
        <AsideListItem>
          <span className="material-icons-outlined">groups</span>
        </AsideListItem>
      </AsideList>
      <SettingBtn>
        <span className="material-icons-outlined">settings</span>
      </SettingBtn>
    </Wrap>
  );
};

export default SideBar;
