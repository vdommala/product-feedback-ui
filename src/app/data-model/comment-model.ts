import { Reply } from './reply-model';
import { User } from './user-model';

export type Comment = {
  id: string;
  requestId: string;
  content: string;
  user: User;
  replies: Reply[];
};
