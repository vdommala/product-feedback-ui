import { User } from './user-model';
export type Reply = {
  id: string;
  commentId: string;
  replytoId: string;
  content: string;
  user: User;
  replyTo: string;
};

