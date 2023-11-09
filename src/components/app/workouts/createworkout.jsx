import React, { useState } from "react";
import CSRFToken from "../../csrf/csrf";
import Mutations from "../utils/graphmutations";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";


const AddWorkout = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createWorkout] = useMutation(Mutations.workout);
  // const [AddWorkoutform, setStateAddform]=useState(true)
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleSubmit = () => {
    if (name && description)
      createWorkout({
        variables: { name, description },
      })
        .then((response) => {
          console.log("Workout created:", response);
          return response;
          // Handle success, e.g., show a success message
        })
        .then((data) => {
          console.log(data);
          navigate("/home");
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    return true;
  };

  return <>
  <div className="createworkout">
    
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Description:
        <br />
        <textarea value={description} onChange={handleDescriptionChange} />
      </label>
      <button onClick={handleSubmit}>Create</button>
    </div>
  
  
  
  </>
};

export default AddWorkout;
