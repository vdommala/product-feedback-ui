import { Category } from './category-model';
import { Status } from './status-model';
import { Comment } from './comment-model';

export type FeedbackRequest = {
  id: string;
  title: string;
  description: string;
  upvotes: number;
  status: Status;
  category: Category;
  comments: Comment[];
};
