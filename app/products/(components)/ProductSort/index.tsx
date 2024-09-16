'use client';

import { getQueryClient } from '@/shared/query';
import { useSearchParams } from 'next/navigation';

function setURLSearchParam(key: any, value: any) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({ path: url.href }, '', url.href);
}

export const ProductsSort = ({ onSortChange }: any) => {
  const searchParams = useSearchParams();

  /*   const queryClient: any = getQueryClient(); */

  const handleSortChange = (event: any) => {
    const sortValue = event.target.value;
    onSortChange(sortValue);
    setURLSearchParam('sortWithParam', sortValue);
  };

  return (
    <div className="bg-black text-white p-4 rounded-md">
      <div>
        <select className="bg-black text-white p-2 rounded-md border border-gray-500" onChange={handleSortChange}>
          <option value="">По умолчанию</option>
          <option value="price-asc">По цене (возрастанию)</option>
          <option value="price-desc">По цене (убыванию)</option>
          <option value="year-asc">По году выпуска (возрастанию)</option>
          <option value="year-desc">По году выпуска (убыванию)</option>
        </select>
      </div>
    </div>
  );
};
