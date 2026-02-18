"use client";

import { usePollStore } from "../../../store/usePollStore";
import { useForm } from "react-hook-form";
import { VoteFormData } from "../../../types/types";

function Page() {
  const selectedPoll = usePollStore((state) => state.selectedPoll);

  const { register, handleSubmit, setValue, watch } = useForm<VoteFormData>({
    defaultValues: {
      optionId: "",
      isAnonymous: false,
    },
  });

  const selectedOptionId = watch("optionId");

  const onSubmit = (data: VoteFormData) => {
    if (!data.optionId) {
      alert("Please select an option first!");
      return;
    }
    console.log("Posting Data:", {
      pollId: selectedPoll?.id,
      ...data,
    });
  };

  return (
    <div className="w-full h-full p-8 xl:px-24">
      {/* <h2 className="text-white/80 text-2xl">Poll details</h2> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative h-full w-full mt-6 p-6 rounded-2xl bg-gray-800 flex flex-col gap-10 overflow-y-auto"
      >
        <div className="w-full flex items-start justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
              {selectedPoll?.title}
            </h2>
            <p className="mt-4 text-gray-400 text-lg leading-relaxed font-light ">
              {selectedPoll?.description}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-between min-h-0 gap-3">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
            {selectedPoll?.options.map((option) => {
              const isSelected = selectedOptionId === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setValue("optionId", option.id)}
                  className={`group relative w-full h-20 px-6 rounded-2xl flex items-center gap-4 transition-all duration-300 border cursor-pointer
                    ${
                      isSelected
                        ? "bg-gray-800/60 border-btn"
                        : "bg-gray-900/40 border-gray-800 hover:border-gray-600 hover:bg-gray-800/40"
                    }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                    ${
                      isSelected
                        ? "border-btn"
                        : "border-gray-600 group-hover:border-gray-400"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-3 h-3 rounded-full bg-btn animate-in fade-in zoom-in duration-300" />
                    )}
                  </div>
                  <span
                    className={`text-lg font-medium transition-colors ${
                      isSelected
                        ? "text-white"
                        : "text-gray-400 group-hover:text-gray-200"
                    }`}
                  >
                    {option.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="xl:w-2/3 xl:px-44 pb-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                  Vote Anonymously
                  <span className="text-gray-500 text-xs italic border border-gray-600 rounded-full w-4 h-4 flex items-center justify-center cursor-help">
                    i
                  </span>
                </h3>
                <p className="text-gray-400 text-sm font-light mt-1">
                  Your choice is always anonymous. Public votes only display the
                  name in the list.
                </p>
              </div>

              <label className="relative inline-block w-[60px] h-[34px] cursor-pointer">
                <input type="checkbox" className="opacity-0 w-0 h-0 peer" />
                <span className="absolute top-0 left-0 right-0 bottom-0 bg-gray-700 rounded-[34px] transition-all duration-400 before:absolute before:content-[''] before:h-[26px] before:w-[26px] before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-400 peer-checked:bg-btn peer-checked:before:translate-x-[26px]" />
              </label>
            </div>

            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="w-full max-w-md bg-btn text-navy font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-wider text-sm"
              >
                Submit Vote
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Page;
