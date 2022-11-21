import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import CardTitle from 'components/CardTitle';
import Btn, { MoreBtn } from 'components/Btn';
import { useGetRecommendFriendsQuery, useLazyAddFriendQuery, useLazyGetFriendsQuery } from 'services/friend';
import handleIsOnline from 'utils/handleIsOnline';
import { useAppDispatch } from 'hooks';
import { getFriends } from 'slices/friendsSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

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
  a {
    display: flex;
    align-items: center;
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
  const dispatch = useAppDispatch();
  const { data: recommendFriendsResult } = useGetRecommendFriendsQuery();
  const [addFriendTrigger, addFriendResult] = useLazyAddFriendQuery();
  const [getFriendsTrigger, getFriendsResult] = useLazyGetFriendsQuery();
  const [recommendFriends, setRecommendFriends] = useState<IProfile[]>([]);
  const currentAddFriendUidRef = useRef('');

  useEffect(() => {
    const handleRecommendFriendsApi = () => {
      if (!recommendFriendsResult) return;
      setRecommendFriends(recommendFriendsResult.users);
    };

    handleRecommendFriendsApi();
  }, [recommendFriendsResult]);

  useEffect(() => {
    const handleAddFriendResult = () => {
      toast.success('成功加入好友!');
      getFriendsTrigger();
      const addFriendIndex = recommendFriends
        .findIndex((friend) => friend.uid === currentAddFriendUidRef.current);
      setRecommendFriends((prev) => {
        const temp = [...prev];
        temp.splice(addFriendIndex, 1);
        return temp;
      });
    };

    if (addFriendResult.isSuccess) handleAddFriendResult();
  }, [addFriendResult]);

  useEffect(() => {
    const handleGetFriendsByToken = () => {
      const { data } = getFriendsResult;
      if (data?.friends) {
        dispatch(getFriends(data.friends));
      }
    };

    if (getFriendsResult.isSuccess && !getFriendsResult.isFetching) handleGetFriendsByToken();
  }, [getFriendsResult]);

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
            <FollowItem key={recommendFriend.uid}>
              <Link to={`/${recommendFriend.uid}`}>
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
                  onClick={() => {
                    currentAddFriendUidRef.current = recommendFriend.uid!;
                    addFriendTrigger(recommendFriend.uid!);
                  }}
                >
                  <span className="material-icons-outlined person-add-icon">person_add</span>
                  加好友
                </AddToFriendsBtn>
              </Link>
            </FollowItem>
          ))
        }
      </FollowList>
    </>
  );
};

export default Follow;
