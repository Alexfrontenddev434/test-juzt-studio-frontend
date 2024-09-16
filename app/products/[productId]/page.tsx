import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductById, getProducts } from '../api';

export async function generateStaticParams() {
  let { data } = await getProducts();
  data = data?.results;

  return data.map((item: any) => ({
    productId: item.id,
    fallback: 'blocking',
  }));
}

export default async function ProductPage({ params }: { params: { productId: string } }) {
  const product = (await getProductById(params.productId)).data;

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
      <div className="flex flex-col md:flex-row">
        <div>
          {' '}
          <p className="text-lg mb-4">ID: {product.id}</p>
          <p className="text-lg mb-4">
            <Image
              src={product.image}
              alt={product.model}
              width={400}
              height={300}
              className="w-full h-full object-cover mb-4"
            />
          </p>
        </div>

        <div className="ml-14 mt-auto">
          {' '}
          <p className="text-lg mb-4">Brand: {product.brand}</p>
          <p className="text-lg mb-4">Model: {product.model}</p>
          <p className="text-lg mb-4">Color: {product.color}</p>
          <p className="text-lg mb-4">Price: {product.price}</p>
          <p className="text-lg mb-4">Year: {product.year}</p>
          <p className="text-lg mb-4">Engine: {product.engine}</p>
          <p className="text-lg mb-4">Transmission: {product.transmission}</p>
          <p className="text-lg mb-4">Range: {product.range}</p>
        </div>
      </div>
    </div>
  );
}
