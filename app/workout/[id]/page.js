"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Plus, Bookmark } from "lucide-react";
import { getWorkout } from "../../../lib/api";
import { useStore, MAX_PLAN } from "../../../components/Store";
import Spinner from "../../../components/Spinner";
import NotFound from "../../not-found";

export default function Details() {
  const { id } = useParams();
  const [w, setW] = useState(null);
  const [state, setState] = useState("loading");
  const { plan, addPlan, addSaved } = useStore();

  useEffect(() => {
    getWorkout(id).then((d) => { setW(d); setState(d && d.id ? "ok" : "404"); }).catch(() => setState("404"));
  }, [id]);

  if (state === "loading") return <Spinner label="Loading workout…" />;
  if (state === "404") return <NotFound />;

  const full = plan.length >= MAX_PLAN && !plan.some((p) => p.id === w.id);
  const rows = [["Equipment", w.equipment], ["Difficulty", w.difficulty], ["Sets", w.sets], ["Reps", w.reps],
    ["Duration", `${w.duration} min`], ["Calories", `${w.caloriesBurned} kcal`], ["Rating", w.rating]];

  return (
    <div className="grid gap-8 pt-8 md:grid-cols-2">
      <img src={w.image} alt={w.name} className="w-full rounded-2xl object-cover md:sticky md:top-24 md:h-[460px]" />
      <div>
        <h1 className="font-display text-3xl font-bold uppercase sm:text-4xl">{w.name}</h1>
        <p className="mt-2 text-sm text-gray-400">{w.description}</p>
        <div className="mt-3 flex gap-2">
          {w.muscleGroups.map((m) => <span key={m} className="rounded-full bg-accent px-3 py-0.5 text-[11px] font-bold text-black">{m}</span>)}
        </div>
        <dl className="mt-5 divide-y divide-line rounded-xl border border-line bg-panel">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between px-4 py-3 text-sm">
              <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">{k}</dt><dd className="font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <h2 className="mt-6 text-sm font-bold uppercase">Instructions</h2>
        <ol className="mt-3 space-y-2 text-sm text-gray-300">
          {w.instructions.map((s, i) => <li key={i}><span className="mr-2 text-gray-500">{i + 1}.</span>{s}</li>)}
        </ol>
        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={() => addPlan(w)} disabled={full}
            className="flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-bold text-black disabled:cursor-not-allowed disabled:opacity-40">
            <Plus size={16} /> {full ? "Plan is full" : "Add to today's plan"}
          </button>
          <button onClick={() => addSaved(w)} className="flex items-center gap-2 rounded-md border border-gray-600 px-5 py-3 text-sm font-semibold hover:border-white">
            <Bookmark size={16} /> Save for later
          </button>
        </div>
      </div>
    </div>
  );
}
