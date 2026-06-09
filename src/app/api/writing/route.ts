import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import WritingResponse from '@/models/WritingResponse';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentName = searchParams.get('studentName') || 'Jane';
    const weekId = searchParams.get('weekId') || 'Week 1';
    const assignmentId = searchParams.get('assignmentId') || 'literature-ch1-writing';

    await connectToDatabase();
    const response = await WritingResponse.findOne({ studentName, weekId, assignmentId });

    if (!response) return NextResponse.json({ message: 'No saved response found' }, { status: 404 });
    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch writing response' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const updatedResponse = await WritingResponse.findOneAndUpdate(
      { studentName: body.studentName, weekId: body.weekId, assignmentId: body.assignmentId },
      body,
      { new: true, upsert: true }
    );

    return NextResponse.json({ message: 'Response saved successfully!', data: updatedResponse }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save response' }, { status: 500 });
  }
}
