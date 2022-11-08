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
  username?: string;
  email?: string;
  password?: string;
}

interface IArticle {
  id?: string;
  uid?: string;
  content?: import('Quill').DeltaStatic['ops'];
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
