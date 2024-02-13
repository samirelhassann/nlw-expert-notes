import { ChangeEvent, useContext, useMemo, useState } from "react";

import logo from "@/assets/logo-nlw-expert.svg";

import NewNoteCard from "./components/new-note-card";
import NoteCard from "./components/note-card";
import { NotesContext } from "./contexts/notes-context";

export default function App() {
  const { notes } = useContext(NotesContext);

  const [search, setSearch] = useState("");

  const handleChangeInput = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((note) =>
      note.content.toLowerCase().includes(search.toLowerCase()),
    );
  }, [notes, search]);

  return (
    <main className="max-w-6xl px-10 mx-auto my-12 space-y-6 lg:px-0">
      <img src={logo} alt="NLW Expert" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Search yout notes..."
          className="w-full text-3xl font-semibold tracking-tight bg-transparent outline-none placeholder:text-slate-500"
          value={search}
          onChange={handleChangeInput}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  auto-rows-[250px] gap-6 flex-wrap ">
        <NewNoteCard />

        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            date={note.createdAt}
            content={note.content}
          />
        ))}
      </div>
    </main>
  );
}
