import { ArrowUpRight } from "lucide-react";

export default function NewNoteCard() {
  return (
    <div className="relative flex flex-col gap-3 p-5 rounded-md bg-slate-700">
      <div className="absolute p-[6px] bg-slate-800 right-0 top-0">
        <ArrowUpRight className="text-slate-600" size={20} />
      </div>

      <span className="text-sm font-medium leading-5 text-slate-200">
        Add note
      </span>

      <span className="leading-6 text-slate-400">
        Record an audio note that will be converted to text automatically.
      </span>
    </div>
  );
}
