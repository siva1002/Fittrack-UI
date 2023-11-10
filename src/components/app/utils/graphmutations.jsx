import { useMutation, gql } from "@apollo/client";

const CREATE_WORKOUTS = gql`
  mutation WorkoutCreate($name: String!, $description: String!) {
    workoutCreate(workoutdata: { name: $name, description: $description }) {
      workout {
        description
        name
      }
    }
  }
`;
const CREATE_EXERCISE = gql`
  mutation ExerciseCreate(
    $name: String!
    $reps: Int
    $sets: Int
    $workout: Int
  ) {
    excercise(
      exercisedata: {
        exercise: $name
        reps: $reps
        sets: $sets
        workoutid: $workout
      }
    ) {
      exercise {
        id
        exercise
      }
    }
  }
`;

const CREATE_TRACKINGS = gql`
  mutation MyMutation($IsStarted: Boolean, $workout: Int) {
    trackingsCreate(trackingsdata: { start: $IsStarted, workout: $workout }) {
      message
      status
      trackings {
        duration
      }
    }
  }
`;
const UPDATE_TRACKINGS = gql`
  mutation MyMutation($workout: Int) {
    trackingsUpdate(trackingsdata: { workout: $workout }) {
      trackings {
        workout {
          description
        }
        duration
      }
    }
  }
`;
const Mutations = {
  workout: CREATE_WORKOUTS,
  excercise: CREATE_EXERCISE,
  tracking: CREATE_TRACKINGS,
  updatetracking: UPDATE_TRACKINGS,
};
export default Mutations;
