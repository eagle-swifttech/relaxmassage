'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const routeTitleMap: Record<string, string> = {
  '/': 'Dashboard',
  '/users/employees': 'Employees',
  '/users/employees/create': 'Add Employee',
  '/users/employees/edit/[id]': 'Edit Employee',
  '/users/departments': 'Departments',
  '/users/departments/create': 'Add Department',
  '/candb/company': 'Company',
  '/candb/company/create': 'Add Company',
  '/candb/branch': 'Branch',
  '/candb/branch/create': 'Add Branch',
};

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const pageTitle = routeTitleMap[pathname] || '';

  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-[#f4f1ed] to-[#f9f6f2] shadow-md">
      <h1 className="text-lg font-semibold text-[#967e68]">{pageTitle}</h1>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="px-4 py-2 rounded hover:bg-[#e0dcd7] flex items-center gap-1 text-[#967e68] font-medium"
        >
          Manage
          <i
            className={`bx bx-chevron-down transition-transform duration-200 ${open ? 'rotate-180' : ''
              }`}
          ></i>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow z-50">
            <Link
              href="/profile"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/change-password"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Change Password
            </Link>
            <Link
              href="/hr"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              HR
            </Link>
            <button
              onClick={() => {
                setOpen(false);
                window.location.href = '/login';
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
