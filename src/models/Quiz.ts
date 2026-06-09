import mongoose, { Schema, models } from 'mongoose';

const QuizSchema = new Schema({
  studentName: { type: String, required: true, default: 'Jane' },
  weekId: { type: String, required: true },
  quizId: { type: String, required: true },
  answers: { type: Object, required: true }, // Stores questionId -> selectedOption mapping
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

const Quiz = models.Quiz || mongoose.model('Quiz', QuizSchema);

export default Quiz;
