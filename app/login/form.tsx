'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { toast } from 'react-toastify';

export default function Form() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let response;

    response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (response?.error) {
      toast(`Ошибка: неверный логин или пароль`);
    }

    if (!response?.error) {
      router.push('/');
      router.refresh();
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
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
        Войти
      </button>
    </form>
  );
}
