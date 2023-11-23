import React, { useState, useEffect } from "react";
import Workouts from "../workouts/workout";
import { useMutation } from "@apollo/client";
import Mutations from "../utils/graphmutations";

function StartWorkoutComponent({ props }) {
  const data = props.routines;
  const workout = parseInt(data.id);
  const category = data.category;

  console.log(data);
  const [CurrentExcercise, setExcercise] = useState({});
  const [IsStarted, setStart] = useState(false);
  const [CreateTracking] = useMutation(Mutations.tracking);
  const [UpdateTracking] = useMutation(Mutations.updatetracking);

  const updateTrackings = () => {
    UpdateTracking({ variables: { workout } }).then((response) => {
      console.log("TrackingsUpdate:", response);
      setStart(false);
      return response;
    });
  };
  const Begin = async () => {
    if (data.exercise.length > 0 || category == "CARDIO") {
      CreateTracking({
        variables: { IsStarted: true, workout },
      })
        .then((response) => {
          return response.data;
        })
        .then((resdata) => {
          setStart((e) => !e);
          if (resdata.trackingsCreate.status && category != "CARDIO") {
            let timing = 0;
            let totalduration = data.exercise.reduce((a, b) => {
              return a + b.duration;
            }, 0);
            data.exercise.forEach((item, index) => {
              setTimeout(
                () => setExcercise(item),
                parseInt(data.length) > 1 ? timing * 1000 : setExcercise(item)
              );
              timing += parseInt(item.duration);
            });
            setTimeout(
              () => updateTrackings(),
              parseInt(totalduration + 2) * 1000
            );
          }
          // if(!IsStarted){
          //   updateTrackings()
          // }
        });
    }
  };
  return (
    <>
      {data?.exercise?.length && !category.includes("CARDI0") && (
        <div className="startworkoucomp">
          <div className="startworkoutdiv">
            <div style={{ display: "flex", alignItems: "center", gap: "2%" }}>
              <h1 style={{ textAlign: "center" }}>
                {data.name} <span></span>{" "}
              </h1>
              <button onClick={() => Begin()} style={{ float: "left" }}>
                {console.log(IsStarted)}
                {IsStarted ? "STOP" : "Start"}
              </button>
            </div>
            {data?.exercise?.map((e, index) => {
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
        </div>
      )}
      {category.includes("CARDIO") && (
        <div className="startworkoucomp">
          <div className="startworkoutdiv">
            <div style={{ display: "flex", alignItems: "center", gap: "2%" }}>
              <h1 style={{ textAlign: "center" }}>
                {data.name} <span></span>{" "}
              </h1>
              <button
                onClick={() =>
                  IsStarted && data.category == "CARDIO"
                    ? updateTrackings()
                    : Begin()
                }
                style={{ float: "left" }}
              >
                {IsStarted ? "STOP" : "Start"}
              </button>
            </div>
          </div>
        </div>
      )}

      {IsStarted && (
        <div>
          {(IsStarted && category === "WORKOUT" && (
            <>Current Excercise:{CurrentExcercise.exercise}</>
          )) ||
            "STARTED"}
        </div>
      )}
      {/* {console.log(!data?.length),} */}
      {/* {!data?.length && category == "WORKOUT" && <Workouts/>} */}
    </>
  );
}
export default StartWorkoutComponent;
