export default function Spinner({ label = "Loading workouts…" }) {
  return (<div className="flex flex-col items-center gap-3 py-20 text-gray-400"><div className="spinner" /><p className="text-sm">{label}</p></div>);
}
