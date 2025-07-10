
import { dehydrate, QueryClient } from "@tanstack/react-query";

export const prefetchCover = async ({ queryClient, companyId }: { queryClient: QueryClient; companyId: string }) => {
	await prefetchCoverQuery({ queryClient, companyId });

	return dehydrate(queryClient);
};
