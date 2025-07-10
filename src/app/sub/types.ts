export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  author: string;
}

export interface UpdatePostRequest {
  id: number;
  title?: string;
  content?: string;
  author?: string;
}
