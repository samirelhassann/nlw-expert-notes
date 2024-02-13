/* eslint-disable no-param-reassign */
import { produce } from "immer";

import { ActionTypes, Note } from "./action";

export interface NoteByQuantity {
  note: Note;
  quantity: number;
  totalPrice: number;
}

export interface NoteState {
  notes: Note[];
}

export function noteReducer(
  state: NoteState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: ActionTypes; payload: any },
) {
  switch (action.type) {
    case ActionTypes.ADD_NOTE: {
      const updatedNotes = [...state.notes];

      updatedNotes.push(action.payload.newNote);

      return produce(state, (draft) => {
        draft.notes = updatedNotes;
      });
    }
    case ActionTypes.REMOVE_NOTE: {
      const updatedNotes = state.notes.filter(
        (note) => note.id !== action.payload.noteId,
      );

      return produce(state, (draft) => {
        draft.notes = updatedNotes;
      });
    }

    default:
      return state;
  }
}
