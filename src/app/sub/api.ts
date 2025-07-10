import { Post, CreatePostRequest, UpdatePostRequest } from "./types";

// 테스트용 데이터
let posts: Post[] = [
  {
    id: 1,
    title: "첫 번째 게시글",
    content: "React Query 테스트용 게시글입니다.",
    author: "김철수",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "두 번째 게시글",
    content: "SSR 렌더링 테스트용 게시글입니다.",
    author: "이영희",
    createdAt: new Date().toISOString(),
  },
];

// 모든 게시글 조회
export const getPosts = async (): Promise<Post[]> => {
  // 실제 API 호출을 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...posts];
};

// 단일 게시글 조회
export const getPost = async (id: number): Promise<Post> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const post = posts.find((p) => p.id === id);
  if (!post) {
    throw new Error("게시글을 찾을 수 없습니다.");
  }
  return post;
};

// 게시글 생성
export const createPost = async (data: CreatePostRequest): Promise<Post> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const newPost: Post = {
    id: Math.max(...posts.map((p) => p.id), 0) + 1,
    ...data,
    createdAt: new Date().toISOString(),
  };
  posts.push(newPost);
  return newPost;
};

// 게시글 수정
export const updatePost = async (data: UpdatePostRequest): Promise<Post> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const index = posts.findIndex((p) => p.id === data.id);
  if (index === -1) {
    throw new Error("게시글을 찾을 수 없습니다.");
  }

  posts[index] = { ...posts[index], ...data };
  return posts[index];
};

// 게시글 삭제
export const deletePost = async (id: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error("게시글을 찾을 수 없습니다.");
  }

  posts.splice(index, 1);
};
