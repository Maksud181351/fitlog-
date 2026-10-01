"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { getWorkouts } from "../lib/api";
import Stats from "../components/Stats";
import Spinner from "../components/Spinner";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    getWorkouts().then(setData).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  const list = data.filter((w) => (w.name + w.muscleGroups.join(" ")).toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <section className="mt-6 grid items-center gap-8 rounded-2xl border border-line bg-panel p-6 md:grid-cols-2 md:p-12">
        <div>
          <p className="mb-3 text-xs font-bold tracking-widest text-accent">WORKOUT LIBRARY</p>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight sm:text-6xl">Train with intent. Log every set.</h1>
          <p className="mt-4 max-w-md text-sm text-gray-400">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p>
          <a href="#library" className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-xs font-bold uppercase text-black">
            Browse workouts <ArrowDown size={14} />
          </a>
        </div>
        <img src="https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691400.jpg?w=740" alt="Fitness hero" className="mx-auto max-h-72 w-full rounded-xl object-cover" />
      </section>

      <section id="library" className="scroll-mt-20 pt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase">The Library</h2>
            <p className="text-sm text-gray-400">Twelve lifts covering every major muscle group.</p>
          </div>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or tag…"
            className="w-full rounded-md border border-line bg-panel px-3 py-2 text-sm outline-none focus:border-accent sm:w-64" />
        </div>

        {loading ? <Spinner /> : error ? <p className="py-16 text-center text-red-400">{error}</p> : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((w) => (
              <Link key={w.id} href={`/workout/${w.id}`} className="group overflow-hidden rounded-xl border border-line bg-panel transition hover:border-accent/60">
                <img src={w.image} alt={w.name} className="h-44 w-full object-cover transition group-hover:scale-105" loading="lazy" />
                <div className="space-y-2 p-4">
                  <div className="flex flex-wrap gap-2">
                    {w.muscleGroups.map((m) => <span key={m} className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase text-black">{m}</span>)}
                  </div>
                  <h3 className="font-display text-lg font-bold uppercase">{w.name}</h3>
                  <p className="text-xs text-sky-300/80">{w.equipment}</p>
                  <div className="border-t border-line pt-3"><Stats w={w} /></div>
                </div>
              </Link>
            ))}
            {!list.length && <p className="col-span-full py-10 text-center text-gray-400">No workouts match your search.</p>}
          </div>
        )}
      </section>
    </>
  );
}
