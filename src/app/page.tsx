import Link from "next/link";
import { FileText, Calendar, Lock } from "lucide-react";

export default function Home() {
  const weeks = [
    { id: 1, title: "Week 1: Introduction to AI", status: "available" },
    { id: 2, title: "Week 2: Digital Workplace", status: "locked" },
    { id: 3, title: "Week 3: Tech & Society", status: "locked" },
    { id: 4, title: "Week 4: Future Frontiers", status: "locked" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Welcome Back, Learner!</h1>
        <p className="text-lg text-slate-600">Choose a module below to start your English journey.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {weeks.map((week) => (
          <div
            key={week.id}
            className={`group relative flex flex-col p-6 rounded-2xl border transition-all duration-300 ${
              week.status === "available"
                ? "bg-white border-slate-200 hover:border-indigo-400 hover:shadow-xl hover:-translate-y-1"
                : "bg-slate-100 border-slate-200 opacity-75"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              week.status === "available" ? "bg-indigo-100 text-indigo-600" : "bg-slate-200 text-slate-400"
            }`}>
              {week.status === "available" ? <Calendar size={24} /> : <Lock size={24} />}
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">{week.title}</h3>
            
            {week.status === "available" ? (
              <div className="mt-4 space-y-3">
                <Link
                  href="/week/1/monday"
                  className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors border border-slate-100"
                >
                  <FileText size={18} />
                  <span className="font-semibold text-sm">📄 Monday Reading Material</span>
                </Link>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 border-dashed text-slate-400 text-xs font-medium italic">
                  More coming soon...
                </div>
              </div>
            ) : (
              <div className="mt-auto">
                <span className="inline-block px-3 py-1 rounded-full bg-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  Coming Soon
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
