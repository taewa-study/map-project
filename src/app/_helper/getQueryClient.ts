import { QueryClient } from "@tanstack/react-query";

export function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retryOnMount: true,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 5000,
      },
    },
  });
}
