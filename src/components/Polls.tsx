"use client";

import { Poll } from "../types/types";
import { usePollStore } from "../store/usePollStore";
import { useRouter } from "next/navigation";

function Polls() {
  const Polls = [
    {
      id: 1,
      title: "Best programming language?",
      description:
        "Which language offers the best balance of performance, ecosystem, and developer experience in 2026?",
      options: ["JavaScript", "Python", "Java", "C++"],
      votes: 123456,
      voted: true,
    },
    {
      id: 2,
      title: "Favorite frontend framework?",
      description:
        "Modern web dev is fast. Which library or framework is your go-to for building scalable user interfaces?",
      options: ["React", "Vue", "Angular", "Svelte"],
      votes: 123456,
      voted: true,
    },
    {
      id: 3,
      title: "Preferred backend language?",
      description:
        "When it comes to building robust APIs and server-side logic, which stack do you trust the most?",
      options: ["Node.js", "Python", "Java", "Go"],
      votes: 123456,
      voted: false,
    },
    {
      id: 4,
      title: "Best database?",
      description:
        "Data integrity vs. flexibility. Choose the database engine that handles your production workloads best.",
      options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
      votes: 123456,
      voted: false,
    },
    {
      id: 5,
      title: "Favorite cloud provider?",
      description:
        "Where does your infrastructure live? Rate the provider with the best DX and service reliability.",
      options: ["AWS", "Azure", "Google Cloud", "DigitalOcean"],
      votes: 123456,
      voted: false,
    },
    {
      id: 6,
      title: "Best code editor?",
      description:
        "The ultimate developer tool. Which environment makes you the most productive during long coding sessions?",
      options: ["VS Code", "Sublime Text", "Atom", "Vim"],
      votes: 123456,
      voted: true,
    },
    {
      id: 7,
      title: "Preferred version control system?",
      description:
        "Branching, merging, and collaboration. Which system keeps your codebase organized and safe?",
      options: ["Git", "SVN", "Mercurial", "Perforce"],
      votes: 123456,
      voted: false,
    },
    {
      id: 8,
      title: "Best operating system?",
      description:
        "From kernel performance to UI polish, which OS provides the superior environment for development?",
      options: ["Windows", "macOS", "Linux", "BSD"],
      votes: 123456,
      voted: true,
    },
    {
      id: 9,
      title: "Favorite programming paradigm?",
      description:
        "How do you structure your thoughts? Choose the paradigm that aligns with your problem-solving style.",
      options: ["Object-oriented", "Functional", "Procedural", "Declarative"],
      votes: 123456,
      voted: true,
    },
  ];

  const setSelectedPoll = usePollStore((state) => state.setSelectedPoll);
  const router = useRouter();
  const handleViewDetails = (poll: Poll) => {
    setSelectedPoll(poll);
    router.push(`/polls/${poll.id}`);
  };
  const PollCard = ({ poll }: { poll: Poll }) => {
    return (
      <div className="relative cursor-pointer p-6 rounded-2xl bg-gray-800 hover:bg-gray-700  hover:border-btn transition-all duration-300 hover:scale-[1.02] ">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white mt-2 mb-3 hover:text-btn transition-colors">
            {poll.title}
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-btn animate-pulse" />
            <span className="text-xs text-gray-300 font-mono">
              {poll.votes.toLocaleString()} Votes
            </span>
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
          {poll.description}
        </p>
        <div className="mt-6 flex items-center justify-between gap-3">
          {!poll.voted ? (
            <button className="bg-btn text-navy text-md font-bold px-5 py-2.5 rounded-xl hover:cursor-pointer hover:bg-btn-active/90 transition-all">
              Vote now →
            </button>
          ) : (
            <div className="flex-1 h-11"></div>
          )}
          <button
            className="text-sm font-bold text-btn uppercase tracking-wider transition-opacity hover:cursor-pointer whitespace-nowrap"
            onClick={() => handleViewDetails(poll)}
          >
            View Details →
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full p-8">
      <h2 className="text-white/80  text-2xl">Polls</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {Polls.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>
    </div>
  );
}

export default Polls;
