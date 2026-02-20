"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useMutation } from "@apollo/client/react";
import { CREATE_POLL_MUTATION } from "src/lib/queries";
import { GET_POLLS } from "src/lib/queries";
import { useRouter } from "next/navigation";
import { CreatePollInputs, CreatePollResponse } from "src/types/types";
import { useState } from "react";


function Page() {
  const router = useRouter();
  const [creationSuccess, setCreationSuccess] = useState(false);
  const [createPoll, { loading: creating, error }] =
    useMutation<CreatePollResponse>(CREATE_POLL_MUTATION, {
      refetchQueries: [{ query: GET_POLLS }],
      awaitRefetchQueries: true,
    });

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

  const onSubmit = async (data: CreatePollInputs) => {
    const options = data.options.map((o) => o.value).filter(Boolean);
    if (options.length < 2) {
      alert("Please add at least 2 options.");
      return;
    }
    try {
      const result = await createPoll({
        variables: {
          title: data.title,
          description: data.description,
          options,
          isAnonymous: data.isAnonymous,
        },
      });
      setCreationSuccess(true);

      setTimeout(() => {
        router.push(`/`);
      }, 1500);
    } catch (err) {
      console.error("Create poll error:", err);
    }
  };


  if(creationSuccess) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Poll Created
          </h2>
          <p className="text-gray-400">Redirecting Polls</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-navy px-4">
      <div className="max-w-4xl h-full mx-auto relative flex flex-col p-8 rounded-3xl bg-gray-800/50 border border-gray-700 shadow-2xl backdrop-blur-md">
        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
          Create New Poll
        </h2>
        <p className="text-gray-400 mb-4">Fill out details for your new poll</p>

        {error && (
          <p className="text-red-400 text-sm mb-4 bg-red-400/10 px-4 py-2 rounded-xl border border-red-400/20">
            {error.message}
          </p>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col gap-6"
        >
          <div>
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Poll Title"
              className="w-full bg-gray-900/60 border border-gray-700 p-4 rounded-xl text-white placeholder:text-gray-500 focus:border-btn focus:outline-none transition-all"
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <textarea
            {...register("description")}
            placeholder="Poll Description"
            rows={3}
            className="w-full bg-gray-900/60 border border-gray-700 p-4 rounded-xl text-white placeholder:text-gray-500 focus:border-btn focus:outline-none transition-all resize-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[200px] md:max-h-none overflow-y-auto border rounded-2xl p-4 border-btn 2xl:border-none">
            {fields.map((field, index) => (
              <div key={field.id} className="relative group">
                <input
                  {...register(`options.${index}.value` as const, {
                    required: index < 2 ? "This option is required" : false,
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
                  Anonymous Creation
                  <span className="text-gray-500 text-xs italic border border-gray-600 rounded-full w-4 h-4 flex items-center justify-center cursor-help">
                    i
                  </span>
                </h3>
                <p className="text-gray-500 text-sm font-light">
                  Hide your identity as the creator of this poll
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("isAnonymous")}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-700 rounded-full peer peer-checked:bg-btn transition-all after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>

            <button
              type="submit"
              disabled={creating}
              className="w-2/3 self-center bg-btn text-navy font-bold py-4 rounded-xl hover:scale-[1.01] transition-all uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {creating ? "Creating..." : "Create Poll"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
