"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "./Store";

export default function Navbar() {
  const path = usePathname();
  const { plan, saved, ready } = useStore();
  const link = (href, label, active) => (
    <Link href={href} className={`rounded-full px-3 py-1 text-xs font-semibold ${active ? "bg-accent/15 text-accent" : "text-gray-300 hover:text-white"}`}>{label}</Link>
  );
  return (
    <header className="border-b border-line bg-bg sticky top-0 z-40">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-display text-lg font-bold tracking-wide">FITLOG</Link>
        <div className="flex gap-2">
          {link("/", "Workouts", path === "/" || path.startsWith("/workout"))}
          {link("/my-plan", "My Plan", path === "/my-plan")}
        </div>
        <Link href="/my-plan" className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 font-semibold">Plan
            <span className="rounded-full bg-accent px-2 py-0.5 text-black">{ready ? plan.length : 0}</span></span>
          <span className="flex items-center gap-1.5 text-gray-300">Saved
            <span className="rounded-full border border-gray-600 px-2 py-0.5 text-white">{ready ? saved.length : 0}</span></span>
        </Link>
      </nav>
    </header>
  );
}
