'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex justify-center items-center dark:bg-gray-900">
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
          <h3 className="text-2xl font-bold text-center text-[#967e68] dark:text-white mb-6">
            <u>Relax Home Massage</u> <br />
            Management System
          </h3>

          {error && (
            <p className="text-center text-red-500 text-sm">{error}</p>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-blue-300"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-blue-300"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 mr-2 rounded-sm border-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="remember" className="text-sm text-gray-700 dark:text-white">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#967e68] hover:bg-[#bca074] text-white py-2 rounded-full"
          >
            Login Now
          </button>
        </form>
      </div>

      <div className="w-1/2 flex justify-center items-center dark:bg-gray-900">
        <Image
          src="/images/rhm.jpg"
          alt="Logo"
          width={1000}
          height={1000}
          className="object-contain rounded-full"
        />
      </div>
    </div>
  );
}
