import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { basicInfoChange } from "../../redux-store/redux-featutre/userslice";
import Queries from "../utils/graphqueries";

function Friends() {
  const friends = useSelector((state) => state.friends.friends);
  const { loading, error, data } = useQuery(Queries.dashboard);
  const dispatch = useDispatch();
  if (data) {
    dispatch(basicInfoChange(data.friends));
  }

  console.log(friends)
   return friends.map((friends,i)=>{
        {return (
            <div key={i}>
              <h1>{friends.userfriend.username}</h1>
            </div>
          );}
    }) 
}

export default Friends;
