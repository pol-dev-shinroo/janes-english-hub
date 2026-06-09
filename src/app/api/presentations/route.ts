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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentName = searchParams.get('studentName') || 'Jane';
    const weekId = searchParams.get('weekId') || 'Week 1';

    await connectToDatabase();

    // Find the newest presentation matching the student and week
    const presentation = await Presentation.findOne({ studentName, weekId }).sort({ createdAt: -1 });

    if (!presentation) {
      return NextResponse.json({ message: 'No presentation found' }, { status: 404 });
    }

    return NextResponse.json({ data: presentation }, { status: 200 });
  } catch (error) {
    console.error('Database Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch presentation' }, { status: 500 });
  }
}
