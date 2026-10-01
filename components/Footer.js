import { Dumbbell } from "lucide-react";
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-black/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-gray-500 sm:flex-row">
        <span className="flex items-center gap-2 font-display text-sm font-bold text-white"><Dumbbell size={16} className="text-accent" />FITLOG</span>
        <span>© 2026 FitLog — Workout Library. Train hard, log honest.</span>
      </div>
    </footer>
  );
}
