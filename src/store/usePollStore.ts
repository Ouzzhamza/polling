import {create} from "zustand";
import { Poll } from "../types/types";
import { persist } from "zustand/middleware";

interface PollStore {
  selectedPoll: Poll | null;
  setSelectedPoll: (poll: Poll | null) => void;
}


export const usePollStore = create<PollStore>()(
  persist(
    (set) => ({
      selectedPoll: null,
      setSelectedPoll: (poll) => set({ selectedPoll: poll }),
    }),
    {
      name: "poll-storage",
    }
  )
);