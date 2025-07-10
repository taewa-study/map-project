import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchCompaniesCover } from "./sub";

export const prefetchData = async ({
  queryClient,
}: {
  queryClient: QueryClient;
}) => {
  await queryClient.prefetchQuery({
    queryKey: ["initData"],
    queryFn: () => fetchCompaniesCover(),
  });

  return dehydrate(queryClient);
};
