import React from "react";
import { usePollStore } from "@/store/usePollStore";

function Page() {
  const selectedPoll = usePollStore((state) => state.selectedPoll);
  console.log(selectedPoll);
  return <div>page</div>;
}

export default Page;
