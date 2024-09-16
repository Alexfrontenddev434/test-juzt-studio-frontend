'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function Form() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      setIsLoading(true);

      const response: any = await fetch(`/api/auth/register`, {
        method: 'POST',
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      });

      await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
      });

      if (!response?.error) {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mx-auto max-w-md mt-10 p-4 bg-white rounded-lg shadow-md">
      <input
        name="email"
        className="border border-gray-300 text-gray-900 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="email"
        placeholder="Email"
      />
      <input
        name="password"
        className="border border-gray-300 text-gray-900 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="password"
        placeholder="Password"
      />
      <button
        disabled={isLoading}
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
        Регистрация
      </button>
    </form>
  );
}
