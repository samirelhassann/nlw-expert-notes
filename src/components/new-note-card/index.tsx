/* eslint-disable @typescript-eslint/no-use-before-define */
import { ChangeEvent, useContext, useEffect, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import { toast } from "sonner";

import { NotesContext } from "@/contexts/notes-context";

type editorType = "text" | "audio";

let speechRecognition: SpeechRecognition | null = null;

export default function NewNoteCard() {
  const { addNote: addProductToCart } = useContext(NotesContext);

  const [showOnBoarding, setShowOnBoarding] = useState(true);
  const [editorType, setEditorType] = useState<editorType>();
  const [content, setContent] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAddButtonDisabled = content === "";

  const isSpeechRecognitionSupported =
    "webkitSpeechRecognition" in window || "SpeechRecognition" in window;

  useEffect(() => {
    if (content === "") {
      setShowOnBoarding(true);
    }
  }, [content]);

  const handleStartEditor = (editor: editorType) => {
    setEditorType(editor);
    setShowOnBoarding(false);

    if (editor === "audio") {
      handleStartRecording();
    }
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSaveNote = () => {
    addProductToCart({
      id: crypto.randomUUID(),
      title: content,
      content,
      createdAt: new Date(),
    });

    toast.success("Note added successfully!");
    setIsDialogOpen(false);
  };

  const handleStartRecording = () => {
    setIsRecording(true);

    if (!isSpeechRecognitionSupported) {
      toast.error("Speech recognition is not supported in your browser.");

      setIsRecording(false);
      setShowOnBoarding(true);

      return;
    }

    const RecognitionApi =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new RecognitionApi();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcript = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");

      setContent(transcript);
    };

    speechRecognition.start();
  };

  const handleStopRecording = () => {
    if (speechRecognition !== null) {
      speechRecognition.stop();
    }

    setIsRecording(false);
  };

  const handleOpenDialog = () => {
    setContent("");
    setEditorType(undefined);
    setIsRecording(false);

    setShowOnBoarding(true);
  };

  const renderInputContent = () => {
    if (showOnBoarding) {
      return null;
    }

    if (editorType === "text") {
      return (
        <textarea
          className="flex-1 w-full text-sm leading-6 bg-transparent outline-none resize-none text-slate-400"
          placeholder="Start typing your note..."
          onChange={handleContentChange}
          value={content}
        />
      );
    }

    if (editorType === "audio") {
      return (
        <textarea
          className="flex-1 w-full text-sm leading-6 bg-transparent outline-none resize-none text-slate-400"
          value={content}
          readOnly
        />
      );
    }

    return null;
  };

  const handleOnChangeDialog = () => {
    handleStopRecording();
    setIsDialogOpen((state) => !state);
  };

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={handleOnChangeDialog}>
      <Dialog.Trigger
        className="relative flex flex-col gap-3 p-5 overflow-hidden rounded-md bg-slate-700 hover:ring-2 hover:ring-slate-600 focus-visible:ring-lime-400"
        onClick={handleOpenDialog}
      >
        <div className="absolute p-[6px] bg-slate-800 right-0 top-0">
          <ArrowUpRight className="text-slate-600" size={20} />
        </div>

        <span className="text-sm font-medium leading-5 text-slate-200">
          Add note
        </span>

        <span className="text-sm leading-6 text-slate-400 text-start">
          Record an audio note that will be converted to text automatically.
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 max-w-[680px] lg:w-full bg-slate-700 rounded-md flex flex-col outline-none h-[60vh] overflow-hidden w-[90%] ">
          <Dialog.Close
            type="button"
            className="group absolute p-[6px] bg-slate-800 right-0 top-0 outline-none"
            aria-label="close"
          >
            <X
              className="text-slate-500 group-hover:text-slate-400"
              size={20}
            />
          </Dialog.Close>

          <div className="flex flex-col h-full">
            <div className="flex flex-col flex-1 gap-3 p-5">
              <span className="text-sm font-medium leading-5 text-slate-200">
                Add note
              </span>

              {showOnBoarding ? (
                <span className="overflow-hidden leading-6 text-slate-400">
                  Start by{" "}
                  <button
                    type="button"
                    className="font-medium text-lime-400 hover:underline data-[is-supported=true]:cursor-pointer data-[is-supported=false]:cursor-not-allowed data-[is-supported=false]:opacity-30 data-[is-supported=false]:pointer-events-none"
                    onClick={() => handleStartEditor("audio")}
                    disabled={!isSpeechRecognitionSupported}
                    data-is-supported={isSpeechRecognitionSupported}
                  >
                    recording an audio note
                  </button>{" "}
                  or if you prefer,{" "}
                  <button
                    type="button"
                    className="font-medium text-lime-400 hover:underline"
                    onClick={() => handleStartEditor("text")}
                  >
                    just use text
                  </button>
                  .
                </span>
              ) : (
                renderInputContent()
              )}
            </div>

            {isRecording ? (
              <button
                type="button"
                className="h-[46px] w-full bg-slate-600 flex items-center justify-center hover:opacity-80 duration-300 gap-2"
                onClick={handleStopRecording}
              >
                <span className="text-sm font-medium text-slate-300">
                  Recording
                </span>

                <div className="w-3 h-3 rounded-full bg-rose-400 animate-pulse" />
              </button>
            ) : (
              <button
                type="submit"
                className="h-[46px] w-full bg-lime-400 flex items-center justify-center hover:opacity-80 duration-300 group data-[is-disabled=true]:opacity-30 data-[is-disabled=true]:cursor-not-allowed"
                disabled={isAddButtonDisabled}
                data-is-disabled={isAddButtonDisabled}
                onClick={handleSaveNote}
              >
                <span className="text-sm font-medium text-black">Add note</span>
              </button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
