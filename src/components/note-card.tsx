export default function NoteCard() {
  return (
    <button
      type="button"
      className="relative flex flex-col gap-3 p-5 rounded-md outline-none bg-slate-800 hover:ring-2 hover:ring-slate-600 focus-visible:ring-lime-400"
    >
      <div className="absolute bottom-0 left-0 right-0 rounded-md pointer-events-none bg-gradient-to-t from-black/50 to-black/0 h-1/2" />
      <span className="text-sm font-medium leading-5 text-slate-300">
        2 days ago
      </span>

      <span className="overflow-hidden leading-6 text-slate-400">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        tempore rerum consequuntur suscipit, beatae ratione, illo dolorem optio
        libero ad est dolorum animi saepe esse ipsa in totam delectus expedita?
      </span>
    </button>
  );
}
