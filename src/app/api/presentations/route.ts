import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Presentation from '@/models/Presentation';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const newPresentation = await Presentation.create(body);

    return NextResponse.json(
      { message: 'Presentation saved successfully!', data: newPresentation },
      { status: 201 }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to save presentation' },
      { status: 500 }
    );
  }
}
