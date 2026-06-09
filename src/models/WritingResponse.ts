import mongoose, { Schema, models } from 'mongoose';

const WritingResponseSchema = new Schema({
  studentName: { type: String, required: true, default: 'Jane' },
  weekId: { type: String, required: true },
  assignmentId: { type: String, required: true },
  answers: { type: Object, required: true }, // Stores questionId -> student's written text
  updatedAt: { type: Date, default: Date.now },
});

const WritingResponse = models.WritingResponse || mongoose.model('WritingResponse', WritingResponseSchema);

export default WritingResponse;
