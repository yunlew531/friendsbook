import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect, useState } from 'react';
import { updateChat } from 'slices/chatroomsSlice';
import { io, Socket } from 'socket.io-client';

// eslint-disable-next-line arrow-body-style
const useWebSocket = (url: string) => {
  const profile = useAppSelector((state) => state.userInfo.profile);
  const [ws] = useState<Socket>(io(url));
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleSocket = () => {
      if (!profile.uid || !ws) return;
      console.log(profile.uid);
      ws.on('connect', () => {
        if (profile.uid) ws.emit('join-chatrooms', profile.uid);
        console.log('connected');

        ws.on('message', (data: ISocketChat) => {
          dispatch(updateChat(data));
        });
      });
    };

    handleSocket();
  }, [ws, profile.uid]);

  return {
    ws,
  };
};

export default useWebSocket;
