'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Employee {
  id: number;
  name: string;
  email: string;
  image: string;
  position: string;
  status: 'Online' | 'Offline';
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetch('/api/employees')
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  function handleDelete(id: number) {
    if (confirm('Are you sure?')) {
      fetch(`/api/employees/${id}`, { method: 'DELETE' })
        .then(() => setEmployees(prev => prev.filter(emp => emp.id !== id)));
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4 text-[#967e68]"><i className='bx bx-group bx-md'></i> Employee List</h1>
        <Link href="/users/employees/create">
          <button className="bg-[#967e68] text-white px-4 py-2 rounded mb-4 hover:bg-opacity-90">
            <i className='bx bx-group'></i> Add Employee
          </button>
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
        <div className="flex items-center justify-end flex-wrap md:flex-nowrap gap-4 pb-4 bg-white dark:bg-gray-900 px-4 py-2 rounded-md">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="text"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-[#967e68] focus:border-[#967e68] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#967e68] dark:focus:border-[#967e68]"
              placeholder="Search for users"
            />
          </div>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Position</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((user, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">
                    <input type="checkbox" className="w-4 h-4 text-[#967e68] bg-gray-100 border-gray-300 rounded-sm focus:ring-[#967e68] focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-[#967e68]" />
                  </td>
                  <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <Image src={user.image} alt={`${user.name} image`} width={40} height={40} className="rounded-full" />
                    <div className="ps-3">
                      <div className="text-base font-semibold">{user.name}</div>
                      <div className="font-normal text-gray-500">{user.email}</div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{user.position}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`h-2.5 w-2.5 rounded-full me-2 ${user.status === 'Online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      {user.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <Link href={`/users/employees/${user.id}/edit`} className="font-medium text-[#967e68] hover:underline">Edit</Link>
                    <button onClick={() => handleDelete(user.id)} className="font-medium text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
