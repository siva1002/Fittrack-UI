import { useMutation } from "@apollo/client";
import Mutations from "../utils/graphmutations";

export const Tracking=(data)=>{
    const [CreateTracking] = useMutation(Mutations.tracking);
    const [UpdateTracking] = useMutation(Mutations.updatetracking);
    CreateTracking({
        variables: { IsStarted: true, workout },
      })
        .then((response) => {
          return response.data;
        })
}