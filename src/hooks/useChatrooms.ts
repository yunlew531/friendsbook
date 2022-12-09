import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import toast from 'react-hot-toast';
import { useCreateChatroomMutation } from 'services/chatroom';
import { openChatroom, pushChatroom } from 'slices/chatroomsSlice';

const useChatrooms = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.userInfo.profile);
  const chatrooms = useAppSelector((state) => state.chatrooms.chatrooms);
  const [createChatroomTrigger, createChatroomResult] = useCreateChatroomMutation();

  const findChatroom = (userUid: string) => chatrooms.filter(
    (chatroom) => chatroom.type === 1 && chatroom.members?.includes(userUid),
  )[0];

  const createChatroom = (chatroomOps: ICreateChatroomOps) => {
    const { members } = chatroomOps;
    let { roomName } = chatroomOps;
    if (!roomName) {
      toast.error('請填寫聊天室名稱');
      return;
    }
    roomName = roomName.trim();
    createChatroomTrigger({
      members: [profile.uid!, ...members],
      name: roomName,
    });
  };

  const openMsgWindowByUid = (userUid: string) => {
    const chatroom = findChatroom(userUid);
    dispatch(openChatroom({
      uid: profile.uid!,
      chatroom,
    }));
  };

  useEffect(() => {
    const handleCreateChatroomApi = () => {
      const { isSuccess, data } = createChatroomResult;
      if (!isSuccess) return;
      dispatch(pushChatroom({ chatroom: data.chatroom }));
      dispatch(openChatroom({ uid: profile.uid!, chatroom: data.chatroom }));
    };

    handleCreateChatroomApi();
  }, [createChatroomResult]);

  return {
    openMsgWindowByUid,
    findChatroom,
    createChatroom,
    createChatroomResult,
  };
};

export default useChatrooms;
