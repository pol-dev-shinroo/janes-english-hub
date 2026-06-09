import dns from 'node:dns/promises';
import mongoose from 'mongoose';
import { config } from 'dotenv';

// 1. Force public DNS to avoid the Windows ISP querySrv bug
dns.setServers(['1.1.1.1', '8.8.8.8']);

// 2. Load the environment variables from .env.local
config({ path: '.env.local' });
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ Error: MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

// 3. Define minimal Schemas so Mongoose knows what to delete
const Presentation = mongoose.models.Presentation || mongoose.model('Presentation', new mongoose.Schema({ studentName: String, weekId: String }));
const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', new mongoose.Schema({ studentName: String, weekId: String }));
const WritingResponse = mongoose.models.WritingResponse || mongoose.model('WritingResponse', new mongoose.Schema({ studentName: String, weekId: String }));

// 4. The Reset Function
async function reset(weekNum, moduleType, studentName = 'Jane') {
  const weekId = `Week ${weekNum}`;

  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`\n🔌 Connected to MongoDB Atlas...`);

    if (moduleType === 'reading') {
      console.log(`🧹 Clearing Reading (Presentations) for ${studentName}, ${weekId}...`);
      const result = await Presentation.deleteMany({ studentName, weekId });
      console.log(`✅ Deleted ${result.deletedCount} presentation draft(s).`);
    } 
    else if (moduleType === 'literature') {
      console.log(`🧹 Clearing Literature (Quiz & Writing) for ${studentName}, ${weekId}...`);
      
      const quizResult = await Quiz.deleteMany({ studentName, weekId });
      console.log(`✅ Deleted ${quizResult.deletedCount} quiz record(s).`);

      const writingResult = await WritingResponse.deleteMany({ studentName, weekId });
      console.log(`✅ Deleted ${writingResult.deletedCount} writing response(s).`);
    } 
    else {
      console.log(`❌ Unknown module type: "${moduleType}". Please use "reading" or "literature".`);
    }

  } catch (error) {
    console.error("❌ Database Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log(`🔌 Disconnected from database.\n`);
    process.exit(0);
  }
}

// 5. Command Line Execution Logic
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log("\n⚠️ Usage Error. Please provide the Week Number and Module Type.");
  console.log("Example 1: node reset.mjs 1 reading");
  console.log("Example 2: node reset.mjs 1 literature\n");
  process.exit(1);
}

reset(args[0], args[1]);
