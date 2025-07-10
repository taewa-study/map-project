import Client from "./Client";

import { getQueryClient } from "../_helper/getQueryClient";
import {HydrationBoundary} from "@tanstack/react-query";
import {prefetchData} from "@/app/sub/fetch/prefetchQuery";

export default async function SubPage() {
  const queryClient = getQueryClient();

  const data = await prefetchData({
    queryClient});

	return <HydrationBoundary state={data}><Client /></HydrationBoundary>;
}
