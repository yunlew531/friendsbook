import styled from '@emotion/styled';
import Card from 'components/Card';
import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useEffect, useState } from 'react';
import Friend from 'pages/frontend/MyPage/components/Friend';
import { useLazyGetFriendsByTokenQuery } from 'services/friend';
import { getFriends } from 'slices/friendsSlice';
import Btn from 'components/Btn';
import { useParams } from 'react-router-dom';

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

const Connected = styled(Card)`
  .friend-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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
`;

const CancelInviteFriendBtn = styled(FriendItemBtn)<IThemeProps>`
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white_100};
`;

const ApproveBeFriendBtn = styled(FriendItemBtn)`
  background-color: ${({ theme }) => theme.color.green_100};
  color: ${({ theme }) => theme.color.white_100};
  margin-right: 5px;
`;

const Friends: React.FC = () => {
  const profile = useAppSelector((state) => state.userInfo.profile);
  const dispatch = useAppDispatch();
  const { uid: paramUid } = useParams();
  const [friends, setFriends] = useState<IFriends>({ connected: [], received: [], sent: [] });

  const [getFriendsByTokenTrigger, getFriendsByTokenResult] = useLazyGetFriendsByTokenQuery();

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
                  <CancelInviteFriendBtn type="button">拒絕</CancelInviteFriendBtn>
                </BtnContainer>
              </Friend>
            ))
          }
            </FriendList>
          </Received>
          <Sent>
            <h2>送出的好友邀請</h2>
            <FriendList>
              {
            friends.sent.map((friend) => (
              <Friend key={friend.uid} friend={friend} length={friends.sent.length}>
                <CancelInviteFriendBtn type="button">取消</CancelInviteFriendBtn>
              </Friend>
            ))
          }
            </FriendList>
          </Sent>
        </ReceivedAndSent>
        )
      }
      <Connected>
        <h2>好友</h2>
        <FriendList className="friend-list">
          {
            friends.connected.map((friend) => (
              <Friend key={friend.uid} friend={friend} length={friends.connected.length}>
                <FriendItemBtn
                  type="button"
                  onClick={(e) => { e.stopPropagation(); }}
                >
                  <span className="material-icons-outlined">sms</span>
                </FriendItemBtn>
              </Friend>
            ))
          }
        </FriendList>
      </Connected>
    </Wrap>
  );
};

export default Friends;
