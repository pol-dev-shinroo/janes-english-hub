import mongoose, { Schema, models } from 'mongoose';

const PresentationSchema = new Schema({
  studentName: { type: String, required: true, default: 'Jane' },
  weekId: { type: String, required: true },
  topic: { type: String, required: true },
  intro: { type: String, required: true },
  body: { type: String, required: true },
  conclusion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Presentation = models.Presentation || mongoose.model('Presentation', PresentationSchema);

export default Presentation;
