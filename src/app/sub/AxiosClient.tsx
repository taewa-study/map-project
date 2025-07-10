"use client";

import { useState } from "react";
import {
  usePosts,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
} from "./axios-hooks";
import { CreatePostRequest, UpdatePostRequest } from "./axios-api";

const AxiosClient = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<UpdatePostRequest | null>(
    null
  );
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: 1,
  });

  // React Query hooks
  const { data: posts, isLoading, error } = usePosts();
  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost();
  const deletePostMutation = useDeletePost();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPost) {
      // 수정
      updatePostMutation.mutate({
        id: editingPost.id,
        ...formData,
      });
      setEditingPost(null);
    } else {
      // 생성
      createPostMutation.mutate(formData as CreatePostRequest);
    }

    setFormData({ title: "", body: "", userId: 1 });
    setIsCreating(false);
  };

  const handleEdit = (post: {
    id: number;
    title: string;
    body: string;
    userId: number;
  }) => {
    setEditingPost({ id: post.id });
    setFormData({
      title: post.title,
      body: post.body,
      userId: post.userId,
    });
    setIsCreating(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deletePostMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="p-4">로딩 중...</div>;
  if (error)
    return (
      <div className="p-4 text-red-500">
        에러가 발생했습니다: {error.message}
      </div>
    );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Axios + JSONPlaceholder API CRUD 테스트
      </h1>

      <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded">
        <p className="text-sm text-blue-800">
          💡 JSONPlaceholder API를 사용합니다. 실제로는 데이터가 저장되지 않지만
          API 호출은 정상적으로 작동합니다.
        </p>
      </div>

      {/* 게시글 생성/수정 폼 */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">
          {editingPost ? "게시글 수정" : "새 게시글 작성"}
        </h2>

        {isCreating && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">제목</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">내용</label>
              <textarea
                value={formData.body}
                onChange={(e) =>
                  setFormData({ ...formData, body: e.target.value })
                }
                className="w-full p-2 border rounded"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                사용자 ID
              </label>
              <input
                type="number"
                value={formData.userId}
                onChange={(e) =>
                  setFormData({ ...formData, userId: parseInt(e.target.value) })
                }
                className="w-full p-2 border rounded"
                min="1"
                max="10"
                required
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={
                  createPostMutation.isPending || updatePostMutation.isPending
                }
              >
                {createPostMutation.isPending || updatePostMutation.isPending
                  ? "처리 중..."
                  : "저장"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingPost(null);
                  setFormData({ title: "", body: "", userId: 1 });
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                취소
              </button>
            </div>
          </form>
        )}

        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            새 게시글 작성
          </button>
        )}
      </div>

      {/* 게시글 목록 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">게시글 목록 (최대 100개)</h2>

        {posts?.slice(0, 10).map((post) => (
          <div key={post.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium">{post.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  disabled={deletePostMutation.isPending}
                >
                  삭제
                </button>
              </div>
            </div>

            <p className="text-gray-600 mb-2">{post.body}</p>
            <div className="text-sm text-gray-500">
              사용자 ID: {post.userId} | 게시글 ID: {post.id}
            </div>
          </div>
        ))}

        {posts?.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            게시글이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default AxiosClient;
