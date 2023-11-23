import { useMutation, gql } from "@apollo/client";

const CREATE_WORKOUTS = gql`
  mutation WorkoutCreate($name: String!, $description: String!,$category: String!) {
    workoutCreate(workoutdata: { name: $name, description: $description,category: $category}) {
      workout {
        description
        name
        category
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
    $duration: Int
  ) {
    excercise(
      exercisedata: {
        exercise: $name
        reps: $reps
        sets: $sets
        workoutid: $workout
        duration: $duration
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
        started
      }
    }
  }
`;
const UPDATE_TRACKINGS = gql`
  mutation MyMutation($workout: Int) {
    trackingsUpdate(trackingsdata: { workout: $workout }) {
      status
      trackings {
        workout {
          description
        }
        duration
      }
    }
  }
`;

const CREATE_FRIEND_REQUEST = gql`
  mutation MyMutation($username: String!) {
    createfriendrequest(frienddata: { name: $username }) {
      friend {
        user {
          email
          username
        }
      }
      message
    }
  }
`;

const FRIEND_REQUEST_UPDATE = gql`
  mutation MyMutation($id: String!, $status: String!) {
    friendrequestupdate(requestdata: { id: $id, status: $status }) {
      status
    }
  }
`;
const Unfollow = gql`
  mutation MyMutation($id: String!) {
    unfollow(id: $id) {
      message
    }
  }
`;
const Mutations = {
  workout: CREATE_WORKOUTS,
  excercise: CREATE_EXERCISE,
  tracking: CREATE_TRACKINGS,
  updatetracking: UPDATE_TRACKINGS,
  friendrequest: CREATE_FRIEND_REQUEST,
  friendrequestupdate:FRIEND_REQUEST_UPDATE,
  unfollow:Unfollow
};
export default Mutations;
