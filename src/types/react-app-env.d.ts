/// <reference types="react-scripts" />

interface IThemeProps {
  theme?: typeof import('styleSheets/theme').default;
  as?: React.ElementType<any>;
}

interface IMessage {
  content: string;
  align?: 'left' | 'right';
}

interface INavLink {
  title: string;
  to: string;
}

interface IProfile {
  uid?: string;
  nickname?: string;
  name?: string;
  photo_url?: string;
  email?: string;
  password?: string;
  last_seen?: number;
  banner_url?: string;
  avatar_url?: string;
}

interface IAuthor {
  uid: string;
  name: string;
  nickname: string;
  avatar_url?: string;
}

interface IArticle {
  id?: string;
  content?: import('Quill').DeltaOperation[] | string;
  created_at?: number;
  author?: IAuthor;
  comments?: IComment[];
  article_likes?: IThumbsUp[];
}

interface IThumbsUp {
  id?: string;
  author?: IAuthor;
  created_at?: number;
}

interface IComment {
  id?: string;
  content?: string;
  created_at?: number;
  author?: IAuthor;
}

interface IImage {
  id: string;
  url: string;
  user_uid: string;
  created_at: number;
}

interface IErrorResult {
  data: {
    message: string;
    code: number;
  }
  status: number;
}

interface IFriend {
  id?: string;
  uid?: string;
  name?: string;
  nickname?: string;
  connected_time?: number;
  last_seen?: number;
  avatar_url?: string;
}

interface IFriends {
  connected: IFriend[];
  received: IFriend[];
  sent: IFriend[];
}

interface IChatroom {
  id?: string;
  name?: string;
  nickname?: string;
  type?: 1 | 2; // 1 = one to one, 2 = multiple
  avatar_url?: string;
  chats?: IChat[];
  members?: string[];
  fold?: boolean;
  inOpenList?: boolean;
  openWindow?: boolean;
  moreList?: boolean;
}

interface IChat {
  id?: string;
  user_uid?: string;
  content?: string;
  created_at?: number;
  status?: 1 | 2; // 1 = normal, 2 = delete
  read_users?: string[];
  author?: IAuthor;
}

interface ISocketChat {
  chatroom_id?: string;
  content?: string;
  avatar_url?: string;
  user_uid?: string;
}

interface ISocketChatPayload {
  chat: ISocketChat;
}

interface IChatroomWindowPayload {
  chatroomId: string;
  status: boolean;
  uid: string;
}

interface IUsersChatrooms {
  [uid: string]: ILocalChatrooms
}

type LocalChatroom = Pick<IChatroom, 'fold' | 'inOpenList' | 'openWindow'>;

interface ILocalChatrooms {
  [chatroomId: string]: LocalChatroom;
}

interface IChatroomsPayload {
  uid: string;
  chatrooms: IChatroom[];
}

interface IChatroomPayload {
  uid: string;
  chatroom: IChatroom;
}

type ChatroomType = 'oneToOne' | 'multiple' | 'multipleCreate' | null;

type RequiredPick<T, K extends keyof T> = Required<Pick<T, K>>;
