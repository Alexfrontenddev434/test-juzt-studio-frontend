'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { getProducts } from '../../api';
import { ProductFilters } from '../ProductFilters';
import Link from 'next/link';
import clsx from 'clsx';
import { useCallback, useRef } from 'react';
import { getProductsPayload, ToggleSet } from '@/shared/helpers';
import { getQueryClient } from '@/shared/query';
import { ProductsSort } from '../ProductSort';

const textTransform = (text: string) => {
  switch (text) {
    case 'GASOLINE':
      text = 'Бензин';
      break;
    case 'DIESEL':
      return 'Дизель';
    case 'ELECTRIC':
      return 'Электро';

    case 'AUTOMATIC':
      return 'Автомат';
    case 'MANUAL':
      return 'Ручная';
    case 'ROBOTIC':
      return 'Робо';
  }

  return text;
};

export function Table() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page');
  const paramsObject: any = useRef(getProductsPayload(currentPage));

  const {
    data: { data },
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(paramsObject.current),
  });

  const queryClient = getQueryClient();

  const modelsToggleSet = useRef(new ToggleSet());
  const colorsToggleSet = useRef(new ToggleSet());

  const onFiltersChange = (data: string, type: string) => {
    if (type === 'model') {
      modelsToggleSet.current.toggle(data);
    }

    if (type === 'color') {
      colorsToggleSet.current.toggle(data);
    }

    const obj = {
      filtersModel: Array.from(modelsToggleSet.current.set).join(', '),
      filtersColor: Array.from(colorsToggleSet.current.set).join(', '),
    };

    const queryString = new URLSearchParams(obj);
    paramsObject.current = {
      ...paramsObject.current,
      ...Object.fromEntries(queryString.entries()),
    };

    queryClient.invalidateQueries({ queryKey: ['products'] });
    router.push('/products?' + queryString.toString());
  };

  const onSortChange = useCallback(
    (data: string) => {
      const newData = data.split('-');

      const obj = {
        sort: newData[1],
        order: newData[0],
      };

      const queryString = new URLSearchParams(obj);

      paramsObject.current = {
        ...paramsObject.current,
        ...Object.fromEntries(queryString.entries()),
      };

      queryClient.invalidateQueries({ queryKey: ['products'] });
      router.push('/products?' + queryString.toString());
    },
    [queryClient, router],
  );

  const goToProduct = (id: any) => {
    router.push(`/products/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;

  if (!isLoading && !data?.results.length) return <div>No data</div>;

  return (
    <div className={clsx({ disabled: isFetching })}>
      <div>
        {' '}
        <ProductsSort onSortChange={onSortChange} />
        <ProductFilters
          paramsObject={paramsObject.current}
          filtersData={data?.filters}
          onFiltersChange={onFiltersChange}
        />
        <div className="flex gap-2 ml-4 mb-4">
          {' '}
          <Link
            className={clsx('button', !data.previous && 'disabled')}
            href={{ pathname: '/products', query: { page: data?.previous?.page } }}>
            Назад
          </Link>
          <span className="button">{data.currentPage ? data.currentPage : 1}</span>
          <Link
            className={clsx('button', !data.next && 'disabled')}
            href={{ pathname: '/products', query: { page: data?.next?.page } }}>
            Вперед
          </Link>
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 block overflow-x-auto whitespace-nowrap">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Изображение
            </th>
            <th scope="col" className="px-6 py-3">
              Бренд
            </th>
            <th scope="col" className="px-6 py-3">
              Модель
            </th>
            <th scope="col" className="px-6 py-3">
              Цвет
            </th>
            <th scope="col" className="px-6 py-3">
              Цена
            </th>
            <th scope="col" className="px-6 py-3">
              Год
            </th>
            <th scope="col" className="px-6 py-3">
              Двигатель
            </th>
            <th scope="col" className="px-6 py-3">
              Трансмиссия
            </th>
            <th scope="col" className="px-6 py-3">
              Диапазон
            </th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data?.results.map((data: any) => (
              <tr
                onClick={() => goToProduct(data.id)}
                key={data.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
                <td className="px-6 py-4">{data.id}</td>
                <td className="px-6 py-4">
                  {data.image && <Image alt="image" src={data.image} height={100} width={100} />}
                </td>
                <td className="px-6 py-4">{data.brand}</td>
                <td className="px-6 py-4">{data.model}</td>
                <td className="px-6 py-4">{data.color}</td>
                <td className="px-6 py-4">{data.price}</td>
                <td className="px-6 py-4">{data.year}</td>
                <td className="px-6 py-4">{textTransform(data.engine)}</td>
                <td className="px-6 py-4">{textTransform(data.transmission)}</td>
                <td className="px-6 py-4">{data.range}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
