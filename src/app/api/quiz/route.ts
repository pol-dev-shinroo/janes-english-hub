import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Quiz from '@/models/Quiz';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentName = searchParams.get('studentName') || 'Jane';
    const weekId = searchParams.get('weekId') || 'Week 1';
    const quizId = searchParams.get('quizId') || 'literature-ch1';

    await connectToDatabase();

    const quiz = await Quiz.findOne({ studentName, weekId, quizId });

    if (!quiz) {
      return NextResponse.json({ message: 'No saved quiz found' }, { status: 404 });
    }

    return NextResponse.json({ data: quiz }, { status: 200 });
  } catch (error) {
    console.error('Database Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch quiz' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    // Use findOneAndUpdate with "upsert: true" to overwrite existing attempts or create a new one
    const updatedQuiz = await Quiz.findOneAndUpdate(
      { studentName: body.studentName, weekId: body.weekId, quizId: body.quizId },
      body,
      { new: true, upsert: true }
    );

    return NextResponse.json({ message: 'Quiz saved successfully!', data: updatedQuiz }, { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to save quiz' }, { status: 500 });
  }
}
