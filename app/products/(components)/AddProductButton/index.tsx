'use client';

import Link from 'next/link';
import { toast } from 'react-toastify';

export function AddProductButton(session: any) {
  console.log(session);

  const handleProductCreate: () => void = () => {
    if (!session.session) toast('Необходимо выполнить аутентификацию!');
  };

  return (
    <div className="flex ">
      <Link className="button" onClick={handleProductCreate} href="/products/create">
        Добавить автомобиль
      </Link>
    </div>
  );
}
