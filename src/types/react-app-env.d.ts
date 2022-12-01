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
  [key: string]: IFriend[];
}

interface IChatroom {
  id?: string;
  name?: string;
  type?: 1 | 2; // 1 = one to one, 2 = multiple
  avatar_url?: string;
  chats?: IChat[];
  members?: string[];
}

interface IChat {
  id?: string;
  user_uid?: string;
  content?: string;
  created_at?: number;
  status?: 1 | 2; // 1 = normal, 2 = delete
  read_users?: string[];
}

interface ISocketChat {
  chatroom_id?: string;
  content?: string;
}

type ChatroomType = 'oneToOne' | 'multiple' | 'multiple-create' | null;
