

import axios, { AxiosError } from "axios";


const fetchGet = async (url: string) => {



	return axios
		.get(url, {
			headers: headerOptions,
			withCredentials: true,
			timeout: 5000,
		})
		.then(res => res.data)
		.catch((reason: AxiosError) => reason.status);
};

export default fetchGet;

const fetchCompaniesCover = async (companyId: string) => {
	const res = await fetchGet(`/api/v5/companies/${companyId}/landing/header`);

	return res?.data || {};
};
