"use client";

import { useData, usePostData } from "./fetch/query";
import { useState } from "react";

const Client = () => {
  const { data } = useData();
  const postMutation = usePostData();
  const [form, setForm] = useState({
    id: "",
    title: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id || !form.title) return;
    await postMutation.mutateAsync({
      id: Number(form.id),
      title: form.title,
    });
    setForm({ id: "", title: "" });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <div>
          <input
            name="id"
            type="number"
            placeholder="id"
            value={form.id}
            onChange={handleChange}
            className="border p-2 rounded mr-2"
          />
          <input
            name="title"
            type="text"
            placeholder="title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 rounded mr-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={postMutation.isPending}
          >
            POST
          </button>
        </div>
      </form>
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
