'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;

    const menuClass = (href: string) =>
        `flex items-center px-4 py-2 rounded 
        ${isActive(href)
            ? 'bg-gray-200 dark:bg-gray-700 font-semibold text-gray-900 dark:text-white'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300'
        }`;

    return (
        <aside
            className={`${
                collapsed ? 'w-16' : 'w-64'
            } bg-[#967e68] dark:bg-gray-800 dark:border-gray-700 relative transition-[width] duration-400`}
        >
            <button
                className="absolute top-4 right-[-12px] bg-[#f9fafb] dark:bg-gray-800 border dark:border-gray-700 rounded-md p-1 shadow"
                onClick={() => setCollapsed(!collapsed)}
            >
                <i className={`bx ${collapsed ? 'bx-chevron-right' : 'bx-chevron-left'} text-xl`}></i>
            </button>

            <div className="p-4 flex items-center gap-2 text-white">
                <Image
                    src="/images/rhm.jpg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="object-contain rounded-full"
                />
                {!collapsed && (
                    <span className="text-2xl font-bold truncate">RHM</span>
                )}
            </div>

            <nav className="mt-6">
                {!collapsed && (
                    <div className="px-4 text-xs uppercase text-gray-300 tracking-wider mb-2">Dashboard</div>
                )}
                <ul className="space-y-2">
                    <li>
                        <Link href="/" className={menuClass('/')}>
                            <i className="bx bx-grid-alt mr-3 text-lg"></i>
                            {!collapsed && <span className="flex-1 truncate">Dashboard</span>}
                        </Link>
                    </li>
                </ul>

                {!collapsed && (
                    <div className="px-4 mt-6 text-xs uppercase text-gray-300 tracking-wider mb-2">Users</div>
                )}
                <ul className="space-y-2">
                    <li>
                        <Link href="/users/employees" className={menuClass('/users/employees')}>
                            <i className="bx bx-user mr-3 text-lg"></i>
                            {!collapsed && <span className="flex-1 truncate">Employees</span>}
                        </Link>
                    </li>
                    <li>
                        <Link href="/users/departments" className={menuClass('/users/departments')}>
                            <i className="bx bx-sitemap mr-3 text-lg"></i>
                            {!collapsed && <span className="flex-1 truncate">Departments</span>}
                        </Link>
                    </li>
                </ul>

                {!collapsed && (
                    <div className="px-4 mt-6 text-xs uppercase text-gray-300 tracking-wider mb-2">
                        Company & Branch
                    </div>
                )}
                <ul className="space-y-2">
                    <li>
                        <Link href="/candb/company" className={menuClass('/candb/company')}>
                            <i className="bx bx-building mr-3 text-lg"></i>
                            {!collapsed && <span className="flex-1 truncate">Company</span>}
                        </Link>
                    </li>
                    <li>
                        <Link href="/candb/branch" className={menuClass('/candb/branch')}>
                            <i className="bx bx-buildings mr-3 text-lg"></i>
                            {!collapsed && <span className="flex-1 truncate">Branch</span>}
                        </Link>
                    </li>
                </ul>

                {!collapsed && (
                    <div className="px-4 mt-6 text-xs uppercase text-gray-300 tracking-wider mb-2">
                        Inventory & Investment
                    </div>
                )}
                <ul className="space-y-2">
                    <li>
                        <Link href="/inventory/assets" className={menuClass('/inventory/assets')}>
                            <i className="bx bx-box mr-3 text-lg"></i>
                            {!collapsed && <span className="flex-1 truncate">Assets</span>}
                        </Link>
                    </li>
                    <li>
                        <Link href="/investment/portfolio" className={menuClass('/investment/portfolio')}>
                            <i className="bx bx-line-chart mr-3 text-lg"></i>
                            {!collapsed && <span className="flex-1 truncate">Portfolio</span>}
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
