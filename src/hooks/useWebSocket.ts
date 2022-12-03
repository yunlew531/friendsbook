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
      ws.on('connect', () => {
        if (profile.uid) ws.emit('join-chatrooms', profile.uid);
        console.log('connected');

        ws.on('message', (data: ISocketChat) => {
          dispatch(updateChat(data));
        });

        ws.on('error-message', (msg: string) => {
          console.log(msg);
        });
      });
    };

    handleSocket();
  }, [ws, profile.uid]);

  useEffect(() => () => {
    ws.off('connected');
    ws.off('message');
  }, []);

  return {
    ws,
  };
};

export default useWebSocket;
