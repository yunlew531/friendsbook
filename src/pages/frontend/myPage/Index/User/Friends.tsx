import styled from '@emotion/styled';
import Card from 'components/Card';
import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import Friend from 'pages/frontend/MyPage/components/Friend';
import { useDeleteFriendMutation, useLazyGetFriendsByTokenQuery, useRemoveFriendInviteMutation } from 'services/friend';
import { getFriends } from 'slices/friendsSlice';
import Btn from 'components/Btn';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
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
  const dispatch = useAppDispatch();
  const { uid: paramUid } = useParams();
  const [friends, setFriends] = useState<IFriends>({ connected: [], received: [], sent: [] });
  const [removeFriendInviteTrigger, removeFriendInviteResult] = useRemoveFriendInviteMutation();
  const [getFriendsByTokenTrigger, getFriendsByTokenResult] = useLazyGetFriendsByTokenQuery();
  const [deleteFriend, deleteFriendResult] = useDeleteFriendMutation();
  const tempFriendUid = useRef('');

  useEffect(() => {
    if (paramUid === profile.uid) getFriendsByTokenTrigger();
  }, [profile.uid]);

  useEffect(() => {
    const handleGetFriendsApi = () => {
      const { isSuccess, isFetching, data } = getFriendsByTokenResult;
      if (!isSuccess || isFetching) return;
      dispatch(getFriends(data.friends));
      setFriends(data.friends);
    };

    handleGetFriendsApi();
  }, [getFriendsByTokenResult]);

  useEffect(() => {
    const handleRemoveFriendInviteApi = () => {
      const { isSuccess, isLoading, data } = removeFriendInviteResult;
      if (!isSuccess || isLoading) return;
      const { code } = data;
      if (!code) return;
      enum ToastType {
        '已移除邀請' = 1,
        '已拒絕邀請' = 2,
      }
      enum InviteType {
        'sent' = 1,
        'received' = 2,
      }
      toast.success(ToastType[code]);
      // update friends.received or friends.sent
      setFriends((prev) => {
        const index = prev[InviteType[code]]
          .findIndex((friend) => friend.uid === tempFriendUid.current);
        const tempFriendType = [...prev[InviteType[code]]];
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
      const { isSuccess, isLoading } = deleteFriendResult;
      if (!isSuccess || isLoading) return;
      toast.success('已删除好友!');
      setFriends((prev) => {
        const index = prev.connected.findIndex((friend) => friend.uid === tempFriendUid.current);
        const tempConnected = [...prev.sent];
        tempConnected.splice(index, 1);
        return {
          ...prev,
          connected: tempConnected,
        };
      });
    };

    handleDeleteFriendApi();
  }, [deleteFriendResult]);

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
                  <ApproveBeFriendBtn type="button">同意</ApproveBeFriendBtn>
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
                  <FriendItemBtn
                    type="button"
                    onClick={(e) => { e.stopPropagation(); }}
                  >
                    <span className="material-icons-outlined">sms</span>
                  </FriendItemBtn>
                  <CancelInviteFriendBtn
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFriend(friend.id!);
                      tempFriendUid.current = friend.uid!;
                    }}
                  >移除
                  </CancelInviteFriendBtn>
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
