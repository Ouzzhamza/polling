"use client";

import { useForm, useFieldArray } from "react-hook-form";

interface CreatePollInputs {
  title: string;
  description: string;
  options: { value: string }[];
  isAnonymous: boolean;
}

function Page() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePollInputs>({
    defaultValues: {
      title: "",
      description: "",
      options: [{ value: "" }, { value: "" }],
      isAnonymous: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = (data: CreatePollInputs) => {
    console.log("Creating Poll:", data);
  };

  return (
    <div className="w-full h-full bg-navy ">
      <div className="max-w-4xl h-full mx-auto relative flex flex-col  p-8 rounded-3xl bg-gray-800/50 border border-gray-700 shadow-2xl backdrop-blur-md">
        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
          Create New Poll
        </h2>
        <p className="text-gray-400 mb-4">Fill out details for your new poll</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col gap-6">
          <input
            {...register("title", { required: true })}
            placeholder="Poll Title"
            className="w-full bg-gray-900/60 border border-gray-700 p-4 rounded-xl text-white placeholder:text-gray-500 focus:border-btn focus:outline-none transition-all"
          />
          <textarea
            {...register("description")}
            placeholder="Poll Description"
            rows={3}
            className="w-full bg-gray-900/60 border border-gray-700 p-4 rounded-xl text-white placeholder:text-gray-500 focus:border-btn focus:outline-none transition-all resize-none"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[200px]">
            {fields.map((field, index) => (
              <div key={field.id} className="relative group">
                <input
                  {...register(`options.${index}.value` as const, {
                    required: true,
                  })}
                  placeholder={`Option ${index + 1}`}
                  className="w-full bg-gray-900/60 border border-gray-700 pl-12 pr-4 py-4 rounded-xl text-white placeholder:text-gray-500 focus:border-btn focus:outline-none transition-all"
                />
                {fields.length > 2 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-400 cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          {fields.length < 8 && (
            <button
              type="button"
              onClick={() => append({ value: "" })}
              className="absolute bottom-40 flex items-center gap-2 self-center px-6 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700 transition-all text-sm cursor-pointer"
            >
              + Add Option
            </button>
          )}
          <div className="w-2/3 absolute bottom-5 left-1/5 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium flex items-center gap-2">
                  Anonymous Creation{" "}
                </h3>
                <p className="text-gray-500 text-xs">
                  Hide your identity as the creator of this poll
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("isAnonymous")}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-700 rounded-full peer peer-checked:bg-btn transition-all after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
            <button
              type="submit"
              className="w-2/3 self-center bg-btn text-navy font-bold py-4 rounded-xl hover:scale-[1.01] transition-all uppercase tracking-widest"
            >
              Create Poll
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
