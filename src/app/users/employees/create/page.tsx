'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateEmployeePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, position }),
      });

      if (!res.ok) {
        throw new Error('Failed to create employee');
      }

      const data = await res.json();
      console.log('Created:', data);
      router.push('/users/employees'); 
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-[#967e68]">Create Employee</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Position</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#967e68] text-white px-4 py-2 rounded hover:bg-opacity-90"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Create'}
        </button>
      </form>
    </div>
  );
}
