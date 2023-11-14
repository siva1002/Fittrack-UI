import { gql, useQuery } from "@apollo/client";
const GET_DASHBOARD = gql`
  {
    workout {
      description
      name
      id
      exercise {
        exercise
        duration
        id
        reps
        sets
        workout {
          id
          name
        }
      }
    }
    friends {
      userfriend {
        email
        username
      }
    }
  }
`;
const GET_WORKOUTS = gql`
  {
    workout {
      description
      id
      name
      totalduration
      exercise {
        duration
        exercise
        reps
        sets
        workout {
          id
        }
      }
    }
  }
`;
const GET_FRIENDS = gql`
  {
    friends {
      user {
        email
        username
      }
    }
  }
`;

const GET_EXCERCISE = gql`
  query Exerciseget($id: String!) {
    exercise(id: $id) {
      exercise
      reps
      sets
      id
      workout {
        id
        name
        description
      }
    }
  }
`;
const Queries = {
  dashboard: GET_DASHBOARD,
  workout: GET_WORKOUTS,
  friends: GET_FRIENDS,
  excercise: GET_EXCERCISE,
};
export default Queries;
