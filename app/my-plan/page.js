"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, X, ChevronDown } from "lucide-react";
import { useStore } from "../../components/Store";
import Stats from "../../components/Stats";
import Spinner from "../../components/Spinner";

const SORTS = { duration: "duration", calories: "caloriesBurned", rating: "rating" };

export default function MyPlan() {
  const { plan, saved, done, ready, remove, markDone } = useStore();
  const [tab, setTab] = useState("plan");
  const [sort, setSort] = useState("duration");

  const list = [...(tab === "plan" ? plan : saved)].sort((a, b) => a[SORTS[sort]] - b[SORTS[sort]]);
  const sum = (k) => plan.reduce((t, w) => t + w[k], 0);
  const metrics = [["Exercises", plan.length], ["Minutes", sum("duration")], ["Calories", sum("caloriesBurned")]];

  return (
    <div className="pt-8">
      <h1 className="font-display text-3xl font-bold uppercase">My Plan</h1>
      <p className="text-sm text-gray-400">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl border border-line bg-panel p-5">
        {metrics.map(([k, v], i) => (
          <div key={k}><p className="text-xs text-gray-400">{k}</p>
            <p className={`font-display text-3xl font-bold ${i === 0 ? "text-accent" : ""}`}>{v}</p></div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-lg border border-line bg-panel p-1 text-xs font-semibold">
          {[["plan", "Today's Plan"], ["saved", "Saved"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={`rounded-md px-4 py-2 ${tab === k ? "bg-line text-white" : "text-gray-400"}`}>{l}</button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-xs text-gray-400">Sort By
          <span className="relative">
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="appearance-none rounded-md border border-line bg-panel py-2 pl-3 pr-8 text-xs text-white outline-none">
              <option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2 top-2.5" />
          </span>
        </label>
      </div>

      <div className="mt-4 space-y-3">
        {!ready ? <Spinner /> : list.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line py-16 text-center">
            <h2 className="font-display text-xl font-bold uppercase">Nothing here yet</h2>
            <p className="mt-1 text-xs text-gray-400">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="mt-4 inline-block rounded-full bg-accent px-5 py-2 text-xs font-bold text-black">Go to workouts</Link>
          </div>
        ) : list.map((w) => {
          const isDone = done.includes(w.id);
          return (
            <div key={w.id} className="flex flex-col gap-4 rounded-xl border border-line bg-panel p-3 sm:flex-row sm:items-center">
              <img src={w.image} alt={w.name} className="h-24 w-full rounded-md object-cover sm:h-14 sm:w-24" />
              <div className="flex-1">
                <h3 className={`font-display text-base font-bold uppercase ${isDone ? "line-through opacity-60" : ""}`}>{w.name}</h3>
                <p className="mb-1 text-xs text-gray-400">{w.equipment}</p>
                <Stats w={w} />
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/workout/${w.id}`} className="rounded-full border border-line px-4 py-2 text-xs font-semibold hover:border-white">View Details</Link>
                {tab === "plan" && (
                  <button onClick={() => markDone(w.id)} disabled={isDone}
                    className="flex items-center gap-1 rounded-full bg-accent px-4 py-2 text-xs font-bold text-black disabled:opacity-50">
                    <Check size={14} /> {isDone ? "Done" : "Mark as Done"}
                  </button>
                )}
                <button onClick={() => remove(tab, w.id)} aria-label="Remove" className="rounded-full border border-line p-2 text-gray-300 hover:border-red-400 hover:text-red-400"><X size={14} /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
