"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { GetPollData, PollOption, Vote } from "../../../types/types";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import { GET_SINGLE_POLL } from "src/lib/queries";

const VotesChartData = ({ options }: { options: PollOption[] | undefined }) => {
  if (!options) return null;
  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={options}
      margin={{ top: 1, right: 0, left: 0, bottom: 1 }}
    >
      <XAxis dataKey="text" />
      <YAxis width="auto" />
      <Tooltip
        cursor={false}
        contentStyle={{
          backgroundColor: "#1f2937",
          border: "none",
          borderRadius: "8px",
        }}
        itemStyle={{ color: "#3BB8A8" }}
      />
      <Bar
        dataKey="voteCount"
        fill="#3BB8A8"
        activeBar={{ fill: "#47decb", cursor: "pointer" }}
        radius={[10, 10, 0, 0]}
        barSize={60}
      />
    </BarChart>
  );
};

const Voters = ({ votes }: { votes: Vote[] | undefined }) => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-start text-white/80">
      <h2 className="font-bold text-white mb-2 flex-shrink-0">Voters list</h2>
      {votes?.length ? (
        <ul className="w-full flex-1 overflow-y-auto p-4 space-y-3">
          {votes.map((vote) => (
            <li
              key={vote.id}
              className="w-full p-3 rounded-lg bg-gray-900/40 border border-gray-600/30 flex items-center justify-between"
            >
              <span className="font-medium text-sm">
                {vote.isAnonymous ? "Anonymous" : vote.voterName}
              </span>
              <span className="text-xs text-gray-400">{vote.option.text}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No voters yet.</p>
      )}
    </div>
  );
};

function Page() {
  const router = useRouter();
  const params = useParams();

  const { data } = useQuery<GetPollData>(GET_SINGLE_POLL, {
    variables: { id: params.id },
  });
  const selectedPoll = data?.poll;

  const hasVotedLocally =
    typeof window !== "undefined" && selectedPoll?.id
      ? !!localStorage.getItem(`voted_${selectedPoll.id}`)
      : false;

  const alreadyVoted = hasVotedLocally || selectedPoll?.hasVoted;

  const handleVoteClick = () => {
    router.push(`/poll_voting/${selectedPoll?.id}`);
  };

  return (
    <div className="w-full h-full p-8">
      <div className="relative h-full mt-6 p-6 rounded-2xl bg-gray-800 flex flex-col gap-10">
        <div className="w-full flex items-start justify-between gap-6">
          <div className="max-w-3xl flex-shrink-0">
            <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
              {selectedPoll?.title}
            </h2>
            <p className="mt-4 text-gray-400 text-lg leading-relaxed font-light">
              {selectedPoll?.description}
            </p>
          </div>
          {alreadyVoted ? (
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
              <span className="text-btn">✓</span>
              <span>Already voted</span>
            </div>
          ) : (
            <button
              className="bg-btn text-navy text-md font-bold px-5 py-2.5 rounded-xl hover:cursor-pointer hover:bg-btn-active/90 transition-all"
              onClick={handleVoteClick}
            >
              Vote now
            </button>
          )}
        </div>

        <div className="flex flex-1 min-h-0 gap-3">
          <div className="w-2/3 p-4 rounded-2xl bg-gray-700 flex items-start justify-between text-gray-400">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold">
                  Participation
                </p>
                <h2 className="text-white text-3xl font-bold">
                  {selectedPoll?.totalVotes.toLocaleString()}
                  <span className="pl-2 text-sm font-normal text-gray-400">
                    Total votes
                  </span>
                </h2>
              </div>
            </div>
            <div className="h-full flex-1 flex items-end justify-end">
              <VotesChartData options={selectedPoll?.options} />
            </div>
          </div>
          <div className="w-1/3 p-4 rounded-2xl bg-gray-700">
            <Voters votes={selectedPoll?.votes} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
