import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import Queries from "../utils/graphqueries";
import Workouts from "../workouts/workout";
import CreateExercise from "./exercise";

function ShowExerciseComponent({ props }) {
  const data = props.routines.exercise;
  console.log(props);
  const workoutid = props.routines.id;
  const [Addform, setAddform] = useState(false);
  const [Workout, setWorkout] = useState(0);
  useEffect(() => {
    console.log(Workout);
  }, [Workout]);

  const ShowForm = (id) => {
    console.log(id);
    setWorkout(id);
    setAddform(() => !Addform);
    console.log(Workout);
  };
  return (
    <>
      <button onClick={() => ShowForm(workoutid)} style={{ float: "right" }}>
        Add Routine
      </button>
      {Addform && <CreateExercise props={{ id: Workout }} />}
      {data?.length && !Addform && (
        <div className="routines">
          {data.map((e, index) => {
            return (
              <details key={e.id}>
                <summary>{e.exercise}</summary>
                <p>sets: {e.sets}</p>
                <p>reps: {e.reps}</p>
                <p>duration: {e.duration}sec</p>
              </details>
            );
          })}
        </div>
      )}
      {!data && <Workouts />}
    </>
  );
}
export default ShowExerciseComponent;
