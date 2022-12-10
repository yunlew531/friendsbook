import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import CardTitle from 'components/CardTitle';
import Btn, { MoreBtn } from 'components/Btn';
import { useLazyGetRecommendFriendsQuery } from 'services/friend';
import handleIsOnline from 'utils/handleIsOnline';
import { useNavigate } from 'react-router-dom';
import useFriends from 'hooks/useFriends';

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
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.color.gray_400};
`;

const FollowItem = styled.li<IThemeProps>`
    display: flex;
    align-items: center;
    cursor: default;
    color: ${({ theme }) => theme.color.gray_500};
    font-weight: 700;
    text-decoration: none;
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

const FriendItemPhoto = styled.div<IThemeProps & { online: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 2px solid ${({ online, theme: { color: { green_100 } } }) => (online ? green_100 : 'transparent')};
  overflow: hidden;
  margin-right: 15px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: 1px solid ${({ theme }) => theme.color.white_100};
  }
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

const Follow: React.FC = () => {
  const navigate = useNavigate();
  const [getRecommendFriendTrigger, getRecommendFriendResult] = useLazyGetRecommendFriendsQuery();
  const { sentFriendInviteTrigger, sentFriendInviteResult } = useFriends();
  const [recommendFriends, setRecommendFriends] = useState<IProfile[]>([]);
  const currentAddFriendUidRef = useRef('');

  useEffect(() => {
    getRecommendFriendTrigger();
  }, []);

  useEffect(() => {
    const handleRecommendFriendsApi = () => {
      const { isSuccess, data } = getRecommendFriendResult;
      if (!isSuccess) return;
      setRecommendFriends(data.users);
    };

    handleRecommendFriendsApi();
  }, [getRecommendFriendResult]);

  useEffect(() => {
    const handleSentFriendInviteResult = () => {
      const { isSuccess } = sentFriendInviteResult;
      if (!isSuccess) return;
      const addFriendIndex = recommendFriends
        .findIndex((friend) => friend.uid === currentAddFriendUidRef.current);
      setRecommendFriends((prev) => {
        const temp = [...prev];
        temp.splice(addFriendIndex, 1);
        return temp;
      });
    };

    handleSentFriendInviteResult();
  }, [sentFriendInviteResult]);

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
          recommendFriends.map((recommendFriend) => (
            <FollowItem key={recommendFriend.uid} onClick={() => navigate(`/${recommendFriend.uid}`)}>
              <FriendItemPhoto online={handleIsOnline(recommendFriend.last_seen)}>
                <img
                  src="https://images.unsplash.com/photo-1589424987100-72303ec43d04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=692&q=80"
                  alt={recommendFriend.name}
                />
              </FriendItemPhoto>
              <Username>{recommendFriend.nickname || recommendFriend.name}</Username>
              <AddToFriendsBtn
                type="button"
                anime
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  currentAddFriendUidRef.current = recommendFriend.uid!;
                  sentFriendInviteTrigger(recommendFriend.uid!);
                }}
              >
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
