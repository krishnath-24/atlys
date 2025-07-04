export interface Post {
  id: string;
  content: string;
  emoji: string;
  createdAt: string;
  username: string;
  avatar: string;
}

export type CardProps = {
  post: Post;
  featureNotImplemented?: () => void;
}

export type CreateProps = {
  onClick: () => void;
  featureNotImplemented?: () => void;
}
