import { useAppDispatch } from 'hooks';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  useLazyGetFriendsByTokenQuery, useRemoveFriendInviteMutation, useSentFriendInviteMutation,
} from 'services/friend';
import { getFriends } from 'slices/friendsSlice';

const useFriends = () => {
  const dispatch = useAppDispatch();
  const [sentFriendInviteTrigger, sentFriendInviteResult] = useSentFriendInviteMutation();
  const [getFriendsTrigger, getFriendsResult] = useLazyGetFriendsByTokenQuery();
  const [removeFriendInviteTrigger, removeFriendInviteResult] = useRemoveFriendInviteMutation();

  useEffect(() => {
    const handleSentFriendInviteResult = () => {
      const { isSuccess } = sentFriendInviteResult;
      if (!isSuccess) return;
      toast.success('已傳送好友邀請，等待對方回復!');
      getFriendsTrigger();
    };

    handleSentFriendInviteResult();
  }, [sentFriendInviteResult]);

  useEffect(() => {
    const handleGetFriendsByToken = () => {
      const { data, isSuccess } = getFriendsResult;
      if (!isSuccess) return;
      dispatch(getFriends(data.friends));
    };

    handleGetFriendsByToken();
  }, [getFriendsResult]);

  useEffect(() => {
    const handleRemoveFriendInviteApi = () => {
      const { isSuccess, data } = removeFriendInviteResult;
      if (!isSuccess) return;
      const { code } = data;
      if (!code) return;
      enum ToastType {
        '已移除邀請' = 1,
        '已拒絕邀請' = 2,
      }
      toast.success(ToastType[code]);
      getFriendsTrigger();
    };

    handleRemoveFriendInviteApi();
  }, [removeFriendInviteResult]);

  return {
    sentFriendInviteTrigger,
    getFriendsTrigger,
    removeFriendInviteTrigger,
    sentFriendInviteResult,
    removeFriendInviteResult,
  };
};

export default useFriends;
