import Link from "next/link";
import { Coffee, Home } from "lucide-react";

export default async function WeekEmptyState({ params }: { params: Promise<{ weekId: string }> }) {
  const { weekId } = await params;
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-8 animate-pulse">
        <Coffee size={48} />
      </div>
      
      <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
        Currently empty.
      </h1>
      
      <p className="text-xl text-slate-600 mb-12 max-w-md">
        We're still brewing the content for Week {weekId}! Check back soon for new reading materials and challenges.
      </p>

      <Link
        href="/"
        className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 hover:-translate-y-1"
      >
        <Home size={20} />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  );
}
