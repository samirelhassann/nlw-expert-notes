import { useContext } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { formatDistance } from "date-fns";
import { X } from "lucide-react";
import { toast } from "sonner";

import { NotesContext } from "@/contexts/notes-context";

interface NoteCardProps {
  id: string;
  date: Date;
  content: string;
}

export default function NoteCard({ id, date, content }: NoteCardProps) {
  const { removeNote } = useContext(NotesContext);

  const formatDistanceToNow = formatDistance(date, new Date(), {
    addSuffix: true,
  });

  const handleClickDeleteNote = () => {
    removeNote(id);

    toast.success("Note deleted successfully!");
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger className="relative flex flex-col gap-3 p-5 rounded-md outline-none bg-slate-800 hover:ring-2 hover:ring-slate-600 focus-visible:ring-lime-400">
        <div className="absolute bottom-0 left-0 right-0 rounded-md pointer-events-none bg-gradient-to-t from-black/50 to-black/0 h-1/2" />
        <span className="text-sm font-medium leading-5 text-slate-300">
          {formatDistanceToNow}
        </span>

        <span className="overflow-hidden leading-6 text-slate-400">
          {content}
        </span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 max-w-[680px] lg:w-full bg-slate-700 rounded-md flex flex-col outline-none h-[60vh] overflow-hidden w-[90%] ">
          <Dialog.Close
            type="button"
            className="group absolute p-[6px] bg-slate-800 right-0 top-0"
            aria-label="close"
          >
            <X
              className="text-slate-500 group-hover:text-slate-400"
              size={20}
            />
          </Dialog.Close>

          <div className="flex flex-col flex-1 gap-3 p-5">
            <span className="text-sm font-medium leading-5 text-slate-300">
              {formatDistanceToNow}
            </span>

            <span className="overflow-hidden leading-6 text-slate-400">
              {content}
            </span>
          </div>

          <button
            type="button"
            className="h-[46px] w-full bg-slate-800 flex items-center justify-center hover:opacity-80 duration-300 group"
            onClick={handleClickDeleteNote}
          >
            <span className="text-sm font-medium">
              Do you want to{" "}
              <span className="font-semibold text-red-400 group-hover:underline">
                delete
              </span>{" "}
              this note ?
            </span>
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
