'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { carSchema } from './schema';
import { createProduct } from '../api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { resetCache } from '@/app/actions';
import { getSession } from 'next-auth/react';
import { toast } from 'react-toastify';

type FormFields = z.infer<typeof carSchema>;

const App = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      image:
        'https://media.istockphoto.com/id/1316134499/photo/a-concept-image-of-a-magnifying-glass-on-blue-background-with-a-word-example-zoom-inside-the.jpg?s=612x612&w=0&k=20&c=sZM5HlZvHFYnzjrhaStRpex43URlxg6wwJXff3BE9VA=',
      brand: '2asdds',
      model: 'model1',
      color: 'red1',
      price: 500,
      year: 1990,
      engine: 'GASOLINE',
      range: 100,
      transmission: 'MANUAL',
    },
    resolver: zodResolver(carSchema),
  });

  //const router = useRouter();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      getSession().then((session) => {
        if (!session) {
          toast('Необходимо выполнить аутентификацию!');
          return;
        }

        createProduct(data);
      });
      resetCache();
    } catch (error) {
      setError('root', {
        message: 'Error',
      });
    }
  };

  const [engineType, setEngineType] = useState('');
  const [isTransmissionDisabled, setIsTransmissionDisabled] = useState(true);
  const [isRangeFieldActive, setIsRangeFieldActive] = useState(false);

  const transmissionOptions = [
    { value: 'Автоматическая', label: 'Автоматическая' },
    { value: 'Ручная', label: 'Ручная' },
    { value: 'Роботизированная', label: 'Роботизированная' },
  ];

  const handleEngineTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEngineType = event.target.value;
    setEngineType(selectedEngineType);
    setIsTransmissionDisabled(selectedEngineType !== 'Бензиновый' && selectedEngineType !== 'Дизельный');
    setIsRangeFieldActive(selectedEngineType === 'Электрический');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium text-white-700">
          Изображение
        </label>

        <input
          {...register('image')}
          type="text"
          id="image"
          className="block w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {/* <input type="file" {...register('image')} /> */}
        {errors.image && <p>{errors.image.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="brand" className="block text-sm font-medium text-white-700">
          Бренд
        </label>
        <input
          {...register('brand')}
          type="text"
          id="brand"
          className="block w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.brand && <div className="text-red-500">{errors.brand.message}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="model" className="block text-sm font-medium text-white-700">
          Модель
        </label>
        <input
          {...register('model')}
          type="text"
          id="model"
          className="block w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.model && <div className="text-red-500">{errors.model.message}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="color" className="block text-sm font-medium text-white-700">
          Цвет
        </label>
        <input
          {...register('color')}
          type="text"
          id="color"
          className="block w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.color && <div className="text-red-500">{errors.color.message}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-white-700">
          Цена
        </label>
        <input
          {...register('price', { valueAsNumber: true })}
          type="number"
          id="price"
          className="block w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.price && <div className="text-red-500">{errors.price.message}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="year" className="block text-sm font-medium text-white-700">
          Год выпуска
        </label>
        <input
          {...register('year', { valueAsNumber: true })}
          type="number"
          id="year"
          className="block w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.year && <div className="text-red-500">{errors.year.message}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="engine" className="block text-sm font-medium text-white-700">
          Тип двигателя
        </label>
        <select
          {...register('engine')}
          id="engine"
          className="block w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={engineType}
          onChange={handleEngineTypeChange}>
          <option value="Бензиновый">Бензиновый</option>
          <option value="Дизельный">Дизельный</option>
          <option value="Электрический">Электрический</option>
        </select>
        {errors.engine && <div className="text-red-500">{errors.engine.message}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="transmission" className="block text-sm font-medium text-white-700">
          Трансмиссия
        </label>
        <select
          {...register('transmission')}
          id="transmission"
          className="block w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          disabled={isTransmissionDisabled}>
          {transmissionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.transmission && <div className="text-red-500">{errors.transmission.message}</div>}
      </div>

      <div className={`mb-4  `}>
        <label htmlFor="range" className="block text-sm font-medium text-white-700">
          Запас хода 1 {isRangeFieldActive.toString()}
        </label>
        <input
          {...register('range')}
          id="range"
          type="number"
          className="block w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.range && <div className="text-red-500">{errors.range.message}</div>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:ring-blue-500 focus:border-blue-500">
        {isSubmitting ? 'Создается...' : 'Создать'}
      </button>
    </form>
  );
};

export default App;
