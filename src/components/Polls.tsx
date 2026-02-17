"use client";

import { Poll } from "../types/types";
import { usePollStore } from "../store/usePollStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mockPolls } from "@/data/data";

function Polls() {


  const setSelectedPoll = usePollStore((state) => state.setSelectedPoll);
  const router = useRouter();

  const handleDetailsPrefetch = (poll: Poll) => {
    setSelectedPoll(poll);
    router.prefetch(`/poll_details/${poll.id}`);
  };

  const handleVotingPrefetch = (poll: Poll) => {
    setSelectedPoll(poll);
    router.prefetch(`/poll_details/${poll.id}`)
  }



  const PollCard = ({ poll }: { poll: Poll }) => {
    return (
      <div className="cursor-pointer flex flex-col justify-between p-6 rounded-2xl bg-gray-800 hover:bg-gray-700  hover:border-btn transition-all duration-300 hover:scale-[1.02] ">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white mt-2 mb-3 hover:text-btn transition-colors">
            {poll.title}
          </h3>
          <div className="flex items-center gap-2 self-start mt-4">
            <div className="w-2 h-2 rounded-full bg-btn animate-pulse" />
            <span className="text-xs text-gray-300 font-mono whitespace-nowrap">
              {poll.totalVotes.toLocaleString()} Votes
            </span>
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
          {poll.description}
        </p>
        <div className="mt-6 flex items-center justify-between gap-3">
          {!poll.HasBeenVoted ? (
            <Link
              href={`/poll_voting/${poll.id}`}
              className="bg-btn text-navy text-md font-bold px-5 py-2.5 rounded-xl hover:cursor-pointer hover:bg-btn-active/90 transition-all"
             onMouseEnter={() => handleVotingPrefetch(poll)}
              // onClick={() => handleVoteClick(poll)}
            >
              Vote now →
            </Link>
          ) : (
            <div className="flex-1 h-11"></div>
          )}
          <Link
            href={`/poll_details/${poll.id}`}
            className="text-sm font-bold text-btn uppercase"
            onMouseEnter={() => handleDetailsPrefetch(poll)}
          >
            View Details →
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full p-8 ">
      <h2 className="text-white/80  text-2xl">Polls</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {mockPolls.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>
    </div>
  );
}

export default Polls;
