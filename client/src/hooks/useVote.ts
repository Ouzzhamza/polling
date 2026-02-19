import { useMutation } from "@apollo/client/react";
import { GET_POLLS, GET_SINGLE_POLL, VOTE_MUTATION } from "src/lib/queries";

export const useVote = () => {
  const [voteMutation, { loading, error }] = useMutation(VOTE_MUTATION);

  const vote = async (
    pollId: string,
    optionId: string,
    isAnonymous: boolean,
    voterName?: string
  ) => {
    return voteMutation({
      variables: {
        pollId,
        optionId,
        isAnonymous,
        voterName: isAnonymous ? null : voterName,
      },
      refetchQueries: [
        { query: GET_SINGLE_POLL, variables: { id: pollId } }, 
        { query: GET_POLLS },
      ],
      awaitRefetchQueries: true,
    });
  };

  return { vote, loading, error };
};
