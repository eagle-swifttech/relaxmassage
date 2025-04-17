'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddBranchPage() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [bh_status, setBhStatus] = useState('OPEN');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/branches', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, address, bh_status }),
        });

        if (res.ok) {
            router.push('/candb/branch'); // กลับไปหน้ารายการสาขาหลังเพิ่มเสร็จ
        } else {
            alert('Error creating branch!');
        }
    };

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold mb-4 text-[#967e68]">
                <i className="bx bx-plus"></i> Add New Branch
            </h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-6 rounded-lg shadow-md w-full h-full"
            >
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Branch Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#967e68]"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Address</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        rows={3}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#967e68]"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Status</label>
                    <select
                        value={bh_status}
                        onChange={(e) => setBhStatus(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#967e68]"
                    >
                        <option value="OPEN">OPEN</option>
                        <option value="CLOSE">CLOSE</option>
                    </select>
                </div>
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="bg-[#967e68] text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-[#7b6654] hover:shadow-lg hover:scale-105"
                    >
                        Save Branch
                    </button>

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-400 hover:shadow-md hover:scale-105"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
