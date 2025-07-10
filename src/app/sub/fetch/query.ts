import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCompaniesCover, fetchPost } from "./sub";

export const useData = () => {
  const { data } = useQuery({
    queryKey: ["initData"],
    queryFn: () => fetchCompaniesCover(),
  });
  return { data };
};

export const usePostData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["initData"] });
    },
  });
};
