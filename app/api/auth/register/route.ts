import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { prisma } from '@/shared/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    // validate email and password
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ data: 'User created successfully' }, { status: 201 });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      // Handle Prisma errors
      if (e.code === 'P2002') {
        return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
      } else {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
      }
    } else if (e instanceof Error) {
      // Handle other errors
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      // Handle unknown errors
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}
