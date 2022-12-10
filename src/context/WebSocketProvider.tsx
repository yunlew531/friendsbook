import { useAppDispatch, useAppSelector } from 'hooks';
import React, {
  createContext, PropsWithChildren, useContext, useEffect, useState,
} from 'react';
import { joinWebSocketChatroom, pushChatroom, updateChat } from 'slices/chatroomsSlice';
import { getFriends } from 'slices/friendsSlice';
import { io, Socket } from 'socket.io-client';

const webSocketContext = createContext({} as Socket);
export const useWebSocket = () => useContext(webSocketContext);

const WebSocketProvide: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.userInfo.profile);
  const friends = useAppSelector((state) => state.friends.friends);
  const [ws, setWs] = useState<Socket>();

  const initSocket = () => {
    if (ws && profile.uid) {
      ws.emit('join-chatrooms', profile.uid);

      ws.on('get-chatroom', (chatroom: IChatroom) => {
        dispatch(pushChatroom({ chatroom }));
        ws.emit('join-chatroom', chatroom.id);
      });

      ws.on('join-chatroom', (chatroomId: string) => {
        ws.emit('join-chatroom', chatroomId);
      });

      ws.on('chat', (chat: ISocketChat) => {
        dispatch(updateChat({ chat, uid: profile.uid! }));
      });

      ws.on('message', (msg: string) => {
        if (process.env.NODE_ENV === 'development') console.log(msg);
      });

      ws.on('error-message', (msg: string) => {
        if (process.env.NODE_ENV === 'development') console.log(msg);
      });

      ws.on('join-chatrooms-success', (msg: string) => {
        dispatch(joinWebSocketChatroom());
        if (process.env.NODE_ENV === 'development') console.log(msg);
      });
    }
  };

  useEffect(() => {
    const handleUpdateLastSeenPerMin = () => {
      ws?.on('friends-last-seen', (
        friendsLastSeen: RequiredPick<IFriend, 'id' | 'uid' | 'last_seen'>[],
      ) => {
        const tempFriends = friends.connected.map((friend) => {
          const tempFriend = { ...friend };
          friendsLastSeen.forEach((friendLastSeen) => {
            if (friend.id === friendLastSeen.id) {
              tempFriend.last_seen = friendLastSeen.last_seen;
            }
          });
          return tempFriend;
        });
        dispatch(getFriends({ ...friends, connected: tempFriends }));
      });
    };

    handleUpdateLastSeenPerMin();

    return () => {
      ws?.off('friends-last-seen');
    };
  }, [friends.connected]);

  useEffect(() => {
    setWs(io(process.env.REACT_APP_SOCKET_URL!));

    return () => {
      ws?.disconnect();
    };
  }, []);

  useEffect(() => {
    initSocket();
  }, [ws, profile.uid]);

  return (
    <webSocketContext.Provider value={ws!}>
      {children}
    </webSocketContext.Provider>
  );
};

export default WebSocketProvide;
