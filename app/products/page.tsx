import { Table } from './(components)/ProductsTable';
import { getProducts } from './api';
import { getQueryClient } from '@/shared/query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getProductsPayload } from '@/shared/helpers';

export default async function ProductsPage({ searchParams }: any) {
  const pageNumber = searchParams.page;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(getProductsPayload(pageNumber)),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Table />
      </HydrationBoundary>
    </>
  );
}
