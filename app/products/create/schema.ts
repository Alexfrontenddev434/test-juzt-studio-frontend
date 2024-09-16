import { z } from 'zod';

export const carSchema = z
  .object({
    image: z.string().optional(),
    brand: z.string().min(1, 'Бренд обязателен'),
    model: z.string().min(1, 'Модель обязательна'),
    color: z.string().min(1, 'Цвет обязателен'),
    price: z.number({ message: 'Цена должна быть числом' }).positive('Цена должна быть положительной'),
    year: z.number().min(1900, { message: 'Год выпуска должен быть не ранее 1900 года' }),
    engine: z.enum(['GASOLINE', 'DIESEL', 'ELECTRIC'], {
      description: 'Тип двигателя обязателен',
    }),
    transmission: z.enum(['AUTOMATIC', 'MANUAL', 'ROBOTIC']).optional(),
    range: z
      .number({ message: 'Запас хода должен быть числом' })
      .positive('Запас хода должен быть положительным')
      .optional(),
  })
  .refine((data) => {
    if (data.engine === 'ELECTRIC' && !data.range) {
      return 'Запас хода обязателен для электрического двигателя';
    }
    if (data.engine !== 'ELECTRIC' && data.range) {
      return 'Запас хода не обязателен для неэлектрического двигателя';
    }
    if (data.engine === 'GASOLINE' || data.engine === 'DIESEL') {
      if (!data.transmission) {
        return 'Трансмиссия обязательна для бензинового или дизельного двигателя';
      }
    }
    return true;
  });
