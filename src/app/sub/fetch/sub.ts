import axios, { AxiosError } from "axios";

// Supabase REST API 설정
const supabaseUrl = "https://apgktfixddjccdwvefnm.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Supabase REST API 헤더 옵션
const supabaseHeaders = {
  "Content-Type": "application/json",
  apikey: supabaseKey,
  Authorization: `Bearer ${supabaseKey}`,
};

const fetchGet = async (url: string) => {
  console.log("supabaseKey", supabaseKey);
  return axios
    .get(url, {
      headers: supabaseHeaders,
      withCredentials: true,
      timeout: 5000,
    })
    .then((res) => res.data)
    .catch((reason: AxiosError) => reason.status);
};

export default fetchGet;

export const fetchCompaniesCover = async () => {
  try {
    const res = await fetchGet(`${supabaseUrl}/rest/v1/todos`);
    console.log(res);
    return res || {};
  } catch (error) {
    console.error("fetchCompaniesCover 에러:", error);
    return {};
  }
};
