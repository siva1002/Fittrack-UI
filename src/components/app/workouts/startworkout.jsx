import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import Queries from "../utils/graphqueries";
import Workouts from "../workouts/workout";

function StartWorkoutComponent({ props }) {
  const data=props.routines
  const [CurrentExcercise, setExcercise] = useState({});
  const [IsStarted, setStart] = useState(false);
  const Begin = () => {
    if (data.length > 0) {
      setStart((e) => !e);
      data.forEach((item, index) =>
        setTimeout(() => setExcercise(item), index * 10000)
      );
    }
  };
  return (
    <>
      {data?.length && (
        <div>
          <div className="startworkoutdiv">
            {data?.map((e, index) => {
              return (
                <details key={e.id}>
                  <summary>{e.exercise}</summary>
                  <p>sets: {e.sets}</p>
                  <p>reps: {e.reps}</p>
                </details>
              );
            })}
          </div>
          <button onClick={() => Begin()} style={{ float: "left" }}>
            {console.log(IsStarted)}
            {IsStarted ? "STOP" : "Start"}
          </button>
        </div>
      )}
      {IsStarted && (
        <div>
          <>Current Excercise:{CurrentExcercise.exercise}</>
        </div>
      )}
      {!data?.length && <Workouts props={{ id: id }} />}
    </>
  );
}
export default StartWorkoutComponent;
