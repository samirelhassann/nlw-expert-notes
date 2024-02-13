export enum ActionTypes {
  ADD_NOTE = "ADD_NOTE",
  REMOVE_NOTE = "REMOVE_NOTE",
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export function addNewNoteAction(newNote: Note) {
  return {
    type: ActionTypes.ADD_NOTE,
    payload: {
      newNote,
    },
  };
}

export function removeNoteAction(noteId: string) {
  return {
    type: ActionTypes.REMOVE_NOTE,
    payload: {
      noteId,
    },
  };
}
