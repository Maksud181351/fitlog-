"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);
export const MAX_PLAN = 5;

export function StoreProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem("fitlog") || "{}");
      setPlan(d.plan || []); setSaved(d.saved || []); setDone(d.done || []);
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) try { localStorage.setItem("fitlog", JSON.stringify({ plan, saved, done })); } catch {}
  }, [plan, saved, done, ready]);

  const notify = useCallback((msg, type = "ok") => {
    setToast({ msg, type, k: Date.now() });
    setTimeout(() => setToast(null), 2500);
  }, []);

  const addPlan = (w) => {
    if (plan.some((p) => p.id === w.id)) return notify("Already in today's plan", "err");
    if (plan.length >= MAX_PLAN) return notify("Plan is full (5 lifts max)", "err");
    setPlan([...plan, w]); notify("Added to today's plan");
  };
  const addSaved = (w) => {
    if (saved.some((p) => p.id === w.id)) return notify("Already saved", "err");
    setSaved([...saved, w]); notify("Saved for later");
  };
  const remove = (list, id) => {
    if (list === "plan") { setPlan(plan.filter((p) => p.id !== id)); setDone(done.filter((d) => d !== id)); }
    else setSaved(saved.filter((p) => p.id !== id));
    notify("Workout removed");
  };
  const markDone = (id) => { if (!done.includes(id)) { setDone([...done, id]); notify("Marked as done 💪"); } };

  return (
    <Ctx.Provider value={{ plan, saved, done, ready, addPlan, addSaved, remove, markDone }}>
      {children}
      {toast && (
        <div key={toast.k} role="status"
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-lg px-5 py-3 text-sm font-semibold shadow-xl ${toast.type === "err" ? "bg-red-500 text-white" : "bg-accent text-black"}`}>
          {toast.msg}
        </div>
      )}
    </Ctx.Provider>
  );
}
