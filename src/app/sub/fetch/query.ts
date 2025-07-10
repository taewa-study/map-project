import { useQuery } from "@tanstack/react-query";
import { fetchCompaniesCover } from "./sub";

export const useData = () => {
  const { data } = useQuery({
    queryKey: ["initData"],
    queryFn: () => fetchCompaniesCover(),
  });
  return { data };
};
