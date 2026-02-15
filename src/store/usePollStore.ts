import {create} from "zustand";
import { Poll } from "../types/types";

interface PollStore {
  selectedPoll: Poll | null;
  setSelectedPoll: (poll: Poll | null) => void;
}


export const usePollStore = create<PollStore>((set) => ({
  selectedPoll: null,
  setSelectedPoll: (poll) => set({ selectedPoll: poll }),
}));