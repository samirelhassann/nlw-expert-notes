import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import {
  Note,
  addNewNoteAction,
  removeNoteAction,
} from "@/reducers/note/action";
import { noteReducer } from "@/reducers/note/reducer";

const LOCAL_STORAGE_NOTES_NAME = "@nlw-expert-notes:notes-state-1.0.0";

interface NotesContextType {
  notes: Note[];

  addNote: (product: Note) => void;
  removeNote: (noteId: string) => void;
}

export const NotesContext = createContext({} as NotesContextType);

interface NoteContextProviderProps {
  children: ReactNode;
}

const NoteContextProvider = ({ children }: NoteContextProviderProps) => {
  const [notesState, dispatch] = useReducer(
    noteReducer,
    {
      notes: [],
    },
    () => {
      const storedNotesString = localStorage.getItem(LOCAL_STORAGE_NOTES_NAME);

      if (storedNotesString) {
        const parsedStoredNotes = JSON.parse(storedNotesString) as Note[];

        return {
          notes: parsedStoredNotes,
        };
      }

      return {
        notes: [],
      };
    },
  );

  useEffect(() => {
    const storedNotesString = localStorage.getItem(LOCAL_STORAGE_NOTES_NAME);

    if (storedNotesString) {
      localStorage.setItem(
        LOCAL_STORAGE_NOTES_NAME,
        JSON.stringify(notesState.notes),
      );
    }
  }, [notesState.notes]);

  const addNote = useCallback((note: Note) => {
    dispatch(addNewNoteAction(note));
  }, []);

  const removeNote = useCallback((noteId: string) => {
    dispatch(removeNoteAction(noteId));
  }, []);

  const NoteContextProviderValue = useMemo(() => {
    return {
      notes: notesState.notes,
      addNote,
      removeNote,
    };
  }, [notesState.notes, addNote, removeNote]);

  return (
    <NotesContext.Provider value={NoteContextProviderValue}>
      {children}
    </NotesContext.Provider>
  );
};

export default NoteContextProvider;
