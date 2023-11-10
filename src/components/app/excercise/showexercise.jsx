import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import Queries from "../utils/graphqueries";
import Workouts from "../workouts/workout";
import CreateExercise from "./exercise";

function ShowExerciseComponent({ props }) {
  const data=props.routines.exercise
  console.log(props)
  const workoutid=props.routines.id
  const [Addform, setAddform] = useState(false);
  const [Workout, setWorkout] = useState(0);
  useEffect(() => {
    console.log(Workout);
  }, [Workout]);


  const ShowForm=(id)=>{
    console.log(id)
    setWorkout(id)
    setAddform(()=>!Addform)
    console.log(Workout)

  }
  return (
    <>
    <button onClick={()=>ShowForm(workoutid)} >Add Routine</button>
     {Addform && <CreateExercise props={{"id":Workout}} />}
      {data?.length && !Addform && (
        <div className="createexercise">
          {data.map((e, index) => {
              return (
                <div key={e.id}>
                  <h1>{e.exercise}</h1>
                  <h1>reps: {e.reps}</h1>
                  <h1>sets: {e.sets}</h1>
                  <h1>duration: {e.duration}</h1>

                </div>
              );

          })}
        </div>
      )}
      {!data && <Workouts />}
     
    </>
  );
}
export default ShowExerciseComponent;
