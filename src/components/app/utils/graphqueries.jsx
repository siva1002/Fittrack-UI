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
      id
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
      count
      category
      started
      exercise {
        duration
        exercise
        reps
        sets
        workout {
          id
          category
        }
      }
    }
  }
`;
const GET_FRIENDS = gql`
query Friends($type: String!){
  friends(type:$type ) {
    accepted
    userfriend {
      email
      username
      id
      workouts{
        name
        exercise {
          duration
          exercise
          sets
          reps
        }
      }
    }
    user {
      email
      username
      workouts {
        name
        description
        exercise {
          exercise
          sets
          reps
          id
        }
      }
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
const GET_FRIEND_REQUESTS = gql`
  query PendingRequests {
    friendsrequests {
      id
      user {
        email
        username
      }
      id
    }
    nonfriendusers {
      id
      username
    }
  }
`;

const GET_USER = gql`
  query Userget($id: String) {
    user(id: $id) {
      email
      workouts {
        description
        id
        name
      }
    }
  }
`;
const Queries = {
  dashboard: GET_DASHBOARD,
  workout: GET_WORKOUTS,
  friends: GET_FRIENDS,
  excercise: GET_EXCERCISE,
  friendrequest: GET_FRIEND_REQUESTS,
  get_user: GET_USER,
};
export default Queries;
