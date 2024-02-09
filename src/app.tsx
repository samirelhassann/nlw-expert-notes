import logo from "@/assets/logo-nlw-expert.svg";

import NewNoteCard from "./components/new-note-card";
import NoteCard from "./components/note-card";

export default function App() {
  return (
    <main className="max-w-6xl mx-auto my-12 space-y-6">
      <img src={logo} alt="NLW Expert" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Search yout notes..."
          className="w-full text-3xl font-semibold tracking-tight bg-transparent outline-none placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6 ">
        <NewNoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
      </div>
    </main>
  );
}
