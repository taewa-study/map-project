import axios, { AxiosError } from "axios";

// 테스트용 헤더 옵션
const headerOptions = {
  "Content-Type": "application/json",
};



const fetchGet = async (url: string) => {
  return axios
    .get(url, {
      headers: headerOptions,
      withCredentials: true,
      timeout: 5000,
    })
    .then((res) => res.data)
    .catch((reason: AxiosError) => reason.status);
};

export default fetchGet;

export const fetchCompaniesCover = async () => {
  // 테스트용 API URL로 변경
  const res = await fetchGet(
    `https://jsonplaceholder.typicode.com/posts`
  );
  return res || {};
};


