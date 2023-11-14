import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WorkoutInfo } from "../../redux-store/redux-featutre/workoutslice";
import { useQuery } from "@apollo/client";
import Queries from "../utils/graphqueries";
import AddWorkout from "./createworkout";
import StartWorkoutComponent from "./startworkout";
import ShowExerciseComponent from "../excercise/showexercise";

function Workouts() {
  const workouts = useSelector((state) => state.workout.workout);
  const { loading, error, data } = useQuery(Queries.workout);
  const [ishown, IsShown] = useState(true);
  const [IsStarted, setStarted] = useState(false);
  const [addWorkout, setAddWorkout] = useState(false);

  const [routines, setWorkout] = useState([]);
  const dispatch = useDispatch();

  if (data) {
    dispatch(WorkoutInfo(data.workout));
  }

  const Startworkout = (routines) => {
    setStarted((e) => !e);
    IsShown((e) => !e);
    console.log(routines);
    setWorkout(routines);
  };

  const ShowExercise = (routines) => {
    if (ishown) {
      IsShown(false);
      setWorkout(routines);
    } else {
      IsShown(true);
    }
    return;
  };

  const ChangeIsStarted = () => {
    setStarted((e) => !e);
    IsShown((e) => !e);
  };
  return (
    <>
      {ishown && (
        <div className="workoutdiv">
          <div>
            <button
              onClick={() => setAddWorkout((e) => !e)}
              style={{ float: "right" }}
            >
              {addWorkout ? "Close" : "Add Workout"}
            </button>
            {addWorkout && <AddWorkout />}
          </div>
          <div className="workouts">
            {workouts.map((workout, i) => {
              console.log(workout.exercise);
              return (
                <div key={i}>
                  {console.log(workout?.exercise)}
                  <h1>{workout.name}</h1>
                  <h2>
                    Duration:{workout.totalduration ? workout.totalduration : 0}
                  </h2>
                  <div>
                    <button
                      disabled={workout.exercise.length <= 0 ? true : false}
                      style={{ marginRight: "2rem" }}
                      onClick={() => Startworkout(workout.exercise)}
                    >
                      Start
                    </button>
                    <button onClick={() => ShowExercise(workout)}>
                      Show routines
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {!IsStarted && !ishown && (
        <div>
          <button
            onClick={() => IsShown(true)}
            style={{
              float: "left",
              backgroundColor: "white",
              border: "1px solid black",
              color: "black",
            }}
          >
            back
          </button>
          <ShowExerciseComponent props={{ routines: routines }} />
        </div>
      )}
      {IsStarted && (
        <div>
          <button onClick={() => ChangeIsStarted()}>close</button>
          <StartWorkoutComponent props={{ routines: routines }} />
        </div>
      )}
    </>
  );
}
export default Workouts;
