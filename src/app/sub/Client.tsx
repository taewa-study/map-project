"use client";

import { useData } from "./fetch/query";

const Client = () => {
  const { data } = useData();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">테스트 링크</h3>
        <div className="space-x-2">
          <a href="/sub?companyId=1" className="text-blue-500 hover:underline">
            Company ID 1
          </a>
          <a href="/sub?companyId=2" className="text-blue-500 hover:underline">
            Company ID 2
          </a>
          <a href="/sub?companyId=3" className="text-blue-500 hover:underline">
            Company ID 3
          </a>
        </div>
      </div>
      {data && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">프리페치된 데이터</h3>
          <pre className="bg-gray-100 p-4 rounded text-black">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Client;
