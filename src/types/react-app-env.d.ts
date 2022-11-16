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
  name?: string;
  email?: string;
  password?: string;
}

interface IAuthor {
  uid: string;
  name: string;
}

interface IArticle {
  id?: string;
  content?: import('Quill').DeltaOperation[] | string;
  created_at?: number;
  author?: IAuthor;
  comments?: IComment[];
  thumbs_up?: IThumbsUp[];
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
  publish_at: string;
}

interface IErrorResult {
  data: {
    message: string;
    code: number;
  }
  status: number;
}
