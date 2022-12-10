import styled from '@emotion/styled';
import Card from 'components/Card';
import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import Friend from 'pages/frontend/Index/components/Friend';
import {
  useAgreeToBeFriendMutation, useDeleteFriendMutation, useLazyGetFriendsByTokenQuery,
  useLazyGetFriendsByUidQuery,
} from 'services/friend';
import { getFriends } from 'slices/friendsSlice';
import Btn from 'components/Btn';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import useChatrooms from 'hooks/useChatrooms';
import useFriends from 'hooks/useFriends';
import EmptyBox from '../../components/EmptyBox';

const Wrap = styled.div<IThemeProps>`
  h2 {
    font-size: ${({ theme }) => theme.fontSizes.fs_1};
    color: ${({ theme }) => theme.color.black_300};
  }
`;

const ReceivedAndSent = styled.div<IThemeProps>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 16px;
  ul {
    margin-bottom: 0;
  }
`;

const Received = styled(Card)`
  
`;

const Sent = styled(Card)`
  
`;

interface IConnectedProps {
  length: number;
}

const Connected = styled(Card)<IConnectedProps>`
  .friend-list {
    display: grid;
    grid-template-columns: repeat(${({ length }) => (length === 0 ? '1, 1fr' : '2, 1fr')});
    gap: 16px;
    margin-bottom: 0;
    li {
      border-radius: 8px;
      margin-bottom: 0;
    }
  }
`;

const FriendList = styled.ul<IThemeProps>`
  list-style: none;
  border-radius: 8px;
  overflow: hidden;
  margin: 10px 0 20px;
`;

const FriendItemBtn = styled(Btn)<IThemeProps>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white_100};
  border-radius: 5px;
  padding: 5px;
  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.8);
  }
`;

const AddToFriendsBtn = styled(Btn)<IThemeProps>`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.fs_3};
  font-weight: 700;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.gray_400};
  padding: 8px 10px;
  font-size: ${({ theme }) => theme.fontSizes.fs_5};
  margin-left: auto;
  .person-add-icon {
    font-size: ${({ theme }) => theme.fontSizes.fs_4};
    margin-right: 5px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CancelInviteFriendBtn = styled(FriendItemBtn)<IThemeProps>`
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white_100};
  margin: 0 5px;
`;

const ApproveBeFriendBtn = styled(FriendItemBtn)`
  background-color: ${({ theme }) => theme.color.green_100};
  color: ${({ theme }) => theme.color.white_100};
`;

const Friends: React.FC = () => {
  const profile = useAppSelector((state) => state.userInfo.profile);
  const myFriends = useAppSelector((state) => state.friends.friends);
  const dispatch = useAppDispatch();
  const { uid: paramUid } = useParams();
  const { openMsgWindowByUid } = useChatrooms();
  const [friends, setFriends] = useState<IFriends>({ connected: [], received: [], sent: [] });
  const [getFriendsByTokenTrigger, getFriendsByTokenResult] = useLazyGetFriendsByTokenQuery();
  const [getFriendsByUidTrigger, getFriendsByUidResult] = useLazyGetFriendsByUidQuery();
  const [deleteFriend, deleteFriendResult] = useDeleteFriendMutation();
  const [agreeToBeFriendTrigger, agreeToBeFriendResult] = useAgreeToBeFriendMutation();
  const {
    sentFriendInviteTrigger, removeFriendInviteTrigger, removeFriendInviteResult,
  } = useFriends();
  const tempFriendUid = useRef('');

  useEffect(() => {
    if (paramUid) {
      if (paramUid === profile.uid) getFriendsByTokenTrigger();
      else getFriendsByUidTrigger(paramUid);
    }
  }, [profile.uid, paramUid]);

  useEffect(() => {
    const handleGetFriendsApi = () => {
      const { isSuccess, data } = getFriendsByTokenResult;
      if (!isSuccess) return;
      dispatch(getFriends(data.friends));
      setFriends(data.friends);
    };

    handleGetFriendsApi();
  }, [getFriendsByTokenResult]);

  useEffect(() => {
    const handleGetFriendsApi = () => {
      const { isSuccess, data } = getFriendsByUidResult;
      if (!isSuccess) return;
      setFriends((prev) => ({
        ...prev,
        connected: data.friends,
      }));
    };

    handleGetFriendsApi();
  }, [getFriendsByUidResult]);

  useEffect(() => {
    const handleRemoveFriendInviteApi = () => {
      const { isSuccess, data } = removeFriendInviteResult;
      if (!isSuccess) return;
      const { code } = data;
      if (!code) return;
      enum InviteType {
        'sent' = 1,
        'received' = 2,
      }
      // update friends.received or friends.sent
      setFriends((prev) => {
        const index = prev[InviteType[code] as keyof typeof InviteType]
          .findIndex((friend) => friend.uid === tempFriendUid.current);
        const tempFriendType = [...prev[InviteType[code] as keyof typeof InviteType]];
        tempFriendType.splice(index, 1);
        return {
          ...prev,
          [InviteType[code]]: tempFriendType,
        };
      });
    };

    handleRemoveFriendInviteApi();
  }, [removeFriendInviteResult]);

  useEffect(() => {
    const handleDeleteFriendApi = () => {
      const { isSuccess } = deleteFriendResult;
      if (!isSuccess) return;
      toast.success('已删除好友!');
      setFriends((prev) => {
        const index = prev.connected.findIndex((friend) => friend.uid === tempFriendUid.current);
        const tempConnected = [...prev.connected];
        tempConnected.splice(index, 1);
        return {
          ...prev,
          connected: tempConnected,
        };
      });
    };

    handleDeleteFriendApi();
  }, [deleteFriendResult]);

  useEffect(() => {
    const handleAgreeToBeFriendApi = () => {
      const { isSuccess } = agreeToBeFriendResult;
      if (!isSuccess) return;
      toast.success('新增好友!');
      getFriendsByTokenTrigger();
    };

    handleAgreeToBeFriendApi();
  }, [agreeToBeFriendResult]);

  return (
    <Wrap>
      {
        paramUid === profile.uid && (
        <ReceivedAndSent>
          <Received>
            <h2>收到的好友邀請</h2>
            <FriendList>
              {
            friends.received.map((friend) => (
              <Friend key={friend.uid} friend={friend} length={friends.received.length}>
                <BtnContainer>
                  <ApproveBeFriendBtn
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      agreeToBeFriendTrigger(friend.id!);
                      tempFriendUid.current = friend.uid!;
                    }}
                  >同意
                  </ApproveBeFriendBtn>
                  <CancelInviteFriendBtn
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFriendInviteTrigger(friend.id!);
                      tempFriendUid.current = friend.uid!;
                    }}
                  >拒絕
                  </CancelInviteFriendBtn>
                </BtnContainer>
              </Friend>
            ))
          }
              {friends.received.length === 0 && <li><EmptyBox /></li>}
            </FriendList>
          </Received>
          <Sent>
            <h2>送出的好友邀請</h2>
            <FriendList>
              {
                friends.sent.map((friend) => (
                  <Friend key={friend.uid} friend={friend} length={friends.sent.length}>
                    <CancelInviteFriendBtn
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFriendInviteTrigger(friend.id!);
                        tempFriendUid.current = friend.uid!;
                      }}
                    >取消
                    </CancelInviteFriendBtn>
                  </Friend>
                ))
              }
              {friends.sent.length === 0 && <li><EmptyBox /></li>}
            </FriendList>
          </Sent>
        </ReceivedAndSent>
        )
      }
      <Connected length={friends.connected.length}>
        <h2>好友</h2>
        <FriendList className="friend-list">
          {
            friends.connected.map((friend) => (
              <Friend key={friend.uid} friend={friend} length={friends.connected.length}>
                <BtnContainer>
                  { myFriends.connected.some((myFriend) => myFriend.uid === friend.uid)
                   && profile.uid !== friend.uid && (
                   <FriendItemBtn
                     type="button"
                     onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                       e.stopPropagation();
                       openMsgWindowByUid(friend.uid!);
                     }}
                   >
                     <span className="material-icons-outlined">sms</span>
                   </FriendItemBtn>
                  )}
                  { profile.uid && myFriends.connected[0] && profile.uid !== friend.uid
                   && !myFriends.connected.some((myFriend) => myFriend.uid === friend.uid)
                   && !myFriends.received.some((myFriend) => myFriend.uid === friend.uid)
                   && !myFriends.sent.some((myFriend) => myFriend.uid === friend.uid) && (
                   <AddToFriendsBtn
                     type="button"
                     anime
                     onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                       e.stopPropagation();
                       sentFriendInviteTrigger(friend.uid!);
                     }}
                   >
                     <span className="material-icons-outlined person-add-icon">person_add</span>
                     加好友
                   </AddToFriendsBtn>
                  )}
                  { profile.uid && myFriends.sent[0]
                    && myFriends.sent.some((myFriend) => myFriend.uid === friend.uid)
                    && (
                    <AddToFriendsBtn
                      type="button"
                      anime
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        const friendInMine = myFriends.sent.filter(
                          (myFriend) => myFriend.uid === friend.uid,
                        )[0];
                        if (!friendInMine?.id) return;
                        removeFriendInviteTrigger(friendInMine.id);
                      }}
                    >取消邀請
                    </AddToFriendsBtn>
                    )}
                  {
                    paramUid === profile.uid && (
                    <CancelInviteFriendBtn
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFriend(friend.id!);
                        tempFriendUid.current = friend.uid!;
                      }}
                    >移除
                    </CancelInviteFriendBtn>
                    )
                  }
                </BtnContainer>
              </Friend>
            ))
          }
          {friends.connected.length === 0 && <li><EmptyBox /></li>}
        </FriendList>
      </Connected>
    </Wrap>
  );
};

export default Friends;
