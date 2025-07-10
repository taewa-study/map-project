

export const prefetchCoverQuery = ({ queryClient, companyId }: { queryClient: QueryClient; companyId: string }) => {
	return queryClient.prefetchQuery({
		queryKey: companiesKeys.cover(companyId),
		queryFn: () => fetchCompaniesCover(companyId),
	});
};