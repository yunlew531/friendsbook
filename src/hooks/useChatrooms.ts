import { useAppDispatch, useAppSelector } from 'hooks';
import { openChatroom } from 'slices/chatroomsSlice';

const useChatrooms = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.userInfo.profile);
  const chatrooms = useAppSelector((state) => state.chatrooms.chatrooms);

  const findChatroom = (userUid: string) => chatrooms.filter(
    (chatroom) => chatroom.type === 1 && chatroom.members?.includes(userUid),
  )[0];

  const openMsgWindow = (userUid: string) => {
    const chatroom = findChatroom(userUid);
    if (!chatroom) return;
    dispatch(openChatroom({
      uid: profile.uid!,
      chatroom,
    }));
  };

  return {
    openMsgWindow,
    findChatroom,
  };
};

export default useChatrooms;
