import { useAppDispatch, useAppSelector } from 'hooks';
import React, {
  createContext, PropsWithChildren, useContext, useEffect, useState,
} from 'react';
import { updateChat } from 'slices/chatroomsSlice';
import { io, Socket } from 'socket.io-client';

const webSocketContext = createContext({} as Socket);
export const useWebSocket = () => useContext(webSocketContext);

const ProvideWebSocket: React.FC<PropsWithChildren> = ({ children }) => {
  const profile = useAppSelector((state) => state.userInfo.profile);
  const [ws] = useState<Socket>(io(process.env.REACT_APP_SOCKET_URL!));
  const dispatch = useAppDispatch();

  const initSocket = () => {
    if (ws && profile.uid) {
      ws.emit('join-chatrooms', profile.uid);

      ws.on('chat', (data: ISocketChat) => {
        dispatch(updateChat(data));
      });

      ws.on('message', (msg: string) => {
        console.log(msg);
      });

      ws.on('error-message', (msg: string) => {
        console.log(msg);
      });
    }
  };

  useEffect(() => {
    initSocket();

    return () => {
      ws.off('chat');
      ws.off('message');
      ws.off('error-message');
    };
  }, [ws, profile.uid]);

  return (
    <webSocketContext.Provider value={ws}>
      {children}
    </webSocketContext.Provider>
  );
};

export default ProvideWebSocket;