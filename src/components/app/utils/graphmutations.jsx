import { useMutation, gql } from "@apollo/client";

const CREATE_WORKOUTS=gql`
mutation WorkoutCreate($name: String!, $description: String!) {
    workoutCreate(workoutdata: {name:$name, description:$description}) {
      workout {
        description
        name
      }
    }
  }
`
const CREATE_EXERCISE=gql`mutation ExerciseCreate($name: String!, $reps: Int ,$sets: Int $workout:Int) {
  excercise(exercisedata: {exercise: $name, reps: $reps, sets: $sets, workoutid: $workout}) {
    exercise {
      id
      exercise
    }
  }
}`
const  Mutations ={
    workout:CREATE_WORKOUTS,
    excercise:CREATE_EXERCISE
}
export default Mutations