'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Branch {
  id: number;
  name: string;
  address: string;
  bh_status: string;
}

export default function BranchPage() {
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    fetch('/api/branches')
      .then((res) => res.json())
      .then((data) => setBranches(data));
  }, []);

  const handleDelete = (id: number) => {
    // ใส่ logic ลบ branch ที่นี่
    console.log("Delete branch with id:", id);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4 text-[#967e68]">
          <i className='bx bx-buildings bx-md'></i> Branch List
        </h1>
        <Link href="/candb/branch/create">
          <button className="bg-[#967e68] text-white px-4 py-2 rounded mb-4 transition duration-300 ease-in-out hover:bg-[#7e6854] hover:shadow-md hover:scale-105">
            <i className='bx bx-plus'></i> Add Branch
          </button>
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
        <div className="flex items-center justify-end pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-[#967e68] focus:border-[#967e68] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Search for branches"
            />
          </div>
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr key={branch.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{branch.name}</td>
                <td className="px-6 py-4">{branch.address}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${branch.bh_status === "OPEN" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                    {branch.bh_status}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <Link href={`/candb/branch/${branch.id}/edit`} className="font-medium text-[#967e68] hover:underline">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(branch.id)}
                    className="font-medium text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
