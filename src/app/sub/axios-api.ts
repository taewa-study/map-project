import axios from "axios";

// JSONPlaceholder API 기본 URL
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface CreatePostRequest {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostRequest {
  id: number;
  title?: string;
  body?: string;
  userId?: number;
}

// 모든 게시글 조회
export const getPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<Post[]>("/posts");
  alert("getPosts");
  console.log(response.data);
  return response.data;
};

// 단일 게시글 조회
export const getPost = async (id: number): Promise<Post> => {
  const response = await apiClient.get<Post>(`/posts/${id}`);
  return response.data;
};

// 게시글 생성
export const createPost = async (data: CreatePostRequest): Promise<Post> => {
  const response = await apiClient.post<Post>("/posts", data);
  return response.data;
};

// 게시글 수정
export const updatePost = async (data: UpdatePostRequest): Promise<Post> => {
  const { id, ...updateData } = data;
  const response = await apiClient.put<Post>(`/posts/${id}`, updateData);
  return response.data;
};

// 게시글 삭제
export const deletePost = async (id: number): Promise<void> => {
  await apiClient.delete(`/posts/${id}`);
};
