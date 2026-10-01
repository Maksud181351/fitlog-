import Link from "next/link";
export default function NotFound() {
  return (
    <div className="py-28 text-center">
      <p className="font-display text-7xl font-bold text-accent">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold uppercase">Page not found</h1>
      <p className="mt-1 text-sm text-gray-400">This rep doesn&apos;t exist. Let&apos;s get you back on track.</p>
      <Link href="/" className="mt-6 inline-block rounded-md bg-accent px-5 py-3 text-xs font-bold uppercase text-black">Go to workouts</Link>
    </div>
  );
}
