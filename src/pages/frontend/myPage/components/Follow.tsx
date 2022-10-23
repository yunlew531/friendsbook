import React from 'react';
import styled from '@emotion/styled';
import CardTitle from 'components/CardTitle';
import Btn, { MoreBtn } from 'components/Btn';

const FollowHeader = styled.div<IThemeProps>`
  display: flex;
  justify-content: space-between;
  .material-icons-outlined {
    color: ${({ theme }) => theme.color.gray_300};
    font-size: ${({ theme }) => theme.fontSizes.fs_1};
  }
`;

const FollowList = styled.ul<IThemeProps>`
  list-style: none;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.gray_400};
`;

const FollowItem = styled.li<IThemeProps>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white_100};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_400};
  padding: 15px 25px;
  &:first-of-type {
    border-radius: 8px 8px 0 0;
  }
  &:last-of-type {
    border-radius: 0 0 8px 8px;
    border-bottom: none;
  }
  &:hover {
    filter: brightness(0.95);
  }
  &:active {
    filter: brightness(0.9);
  }
`;

const UserPhoto = styled.img<IThemeProps>`
  flex-shrink: 0;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.color.white_100};
  box-shadow: ${({ theme }) => theme.shadow.m};
  padding: 2px;
  margin-right: 10px;
`;

const Username = styled.p<IThemeProps>`
  flex-grow: 1;
  font-size: ${({ theme }) => theme.fontSizes.fs_4};
`;

const FansPageBtn = styled(Btn)<IThemeProps>`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.fs_3};
  font-weight: 700;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.gray_400};
  padding: 8px 10px;
`;

const AddToFriendsBtn = styled(FansPageBtn)`
  font-size: ${({ theme }) => theme.fontSizes.fs_5};
  margin-left: auto;
  .person-add-icon {
    font-size: ${({ theme }) => theme.fontSizes.fs_4};
    margin-right: 5px;
  }
`;

// eslint-disable-next-line arrow-body-style
const Follow: React.FC = () => {
  return (
    <>
      <FollowHeader>
        <CardTitle>你或許認識？</CardTitle>
        <MoreBtn type="button" anime>
          <span className="material-icons-outlined">more_horiz</span>
        </MoreBtn>
      </FollowHeader>
      <FollowList>
        {
          new Array(5).fill(null).map((item, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <FollowItem key={idx}>
              <UserPhoto src="https://images.unsplash.com/photo-1589424987100-72303ec43d04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=692&q=80" />
              <Username>Tom Tom</Username>
              <AddToFriendsBtn type="button" anime>
                <span className="material-icons-outlined person-add-icon">person_add</span>
                加好友
              </AddToFriendsBtn>
            </FollowItem>
          ))
        }

      </FollowList>
    </>
  );
};

export default Follow;
