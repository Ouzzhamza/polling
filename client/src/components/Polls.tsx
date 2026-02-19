"use client";

import { GetPollsData, Poll } from "../types/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { GET_POLLS } from "src/lib/queries";


function Polls() {

  const { loading, error, data } = useQuery<GetPollsData>(GET_POLLS);
  
  const router = useRouter();

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center  text-white">
        Loading polls...
      </div>
    );
  if (error)
    return (
      <div className="w-full h-full flex justify-center items-center text-red-400 ">
        Error: Can&apos;t load polls
      </div>
    );

  const polls: Poll[] = data?.polls || [];

  const handleDetailsPrefetch = (poll: Poll) => {
    
    router.prefetch(`/poll_details/${poll.id}`);
  };

  const handleVotingPrefetch = (poll: Poll) => {
    
    router.prefetch(`/poll_voting/${poll.id}`);
  };

  const PollCard = ({ poll }: { poll: Poll }) => {

     const hasVotedLocally =
       typeof window !== "undefined"
         ? !!localStorage.getItem(`voted_${poll.id}`)
         : false;

     const alreadyVoted = hasVotedLocally || poll.hasVoted;

    return (
      <div className="cursor-pointer flex flex-col justify-between p-6 rounded-2xl bg-gray-800 hover:bg-gray-700 hover:border-btn transition-all duration-300 hover:scale-[1.02] ">
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
          {poll.description || "No description"}
        </p>

        {!poll.isAnonymous && poll.creator && (
          <p className="text-gray-500 text-xs mt-2">
            by {poll.creator.username}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          {!alreadyVoted ? (
            <Link
              href={`/poll_voting/${poll.id}`}
              className="bg-btn text-navy text-md font-bold px-5 py-2.5 rounded-xl hover:cursor-pointer hover:bg-btn-active/90 transition-all"
              onMouseEnter={() => handleVotingPrefetch(poll)}
            >
              Vote now →
            </Link>
          ) : (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="text-btn">✓</span>
              <span>Already voted</span>
            </div>
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
    <div className="w-full h-full p-8">
      <h2 className="text-white/80 text-2xl">Polls</h2>
      <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 overflow-y-auto">
        {polls.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>
    </div>
  );
}

export default Polls;
