const BASE = "https://api.api-store.workers.dev/api/fitlog";
export async function getWorkouts() {
  const r = await fetch(BASE);
  if (!r.ok) throw new Error("Failed to load workouts");
  return r.json();
}
export async function getWorkout(id) {
  const r = await fetch(`${BASE}/${id}`);
  if (!r.ok) throw new Error("Not found");
  return r.json();
}
