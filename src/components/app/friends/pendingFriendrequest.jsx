import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { basicInfoChange } from "../../redux-store/redux-featutre/userslice";
import Queries from "../utils/graphqueries";
import { TopNavBar } from "../../layouts/navlayout";
import Mutations from "../utils/graphmutations";

const FriendsRequests = () => {
  const { loading, error, data } = useQuery(Queries.friendrequest);
  const [Createfriendrequest] = useMutation(Mutations.friendrequest);
  const [Updatefriendrequest] = useMutation(Mutations.friendrequestupdate);

  const SendRequest = (username) => {
    Createfriendrequest({
      variables: { username },
    }).then((response) => {
      console.log("Friend Request created:", response);
      return response;
    });
  };
  const UpdateRequest = (id, status) => {
    Updatefriendrequest({ variables: { id, status } });
  };
  if (loading) return <p>Loading...</p>;
  return (
    <div className="requestdiv">
      <TopNavBar />
      {data.friendsrequests.map((r, index) => (
        <div>
          <h1>{r.user.username}</h1>
          <button onClick={() => UpdateRequest(r.id, "accept")}>Accept</button>
          <button onClick={() => UpdateRequest(r.id, "reject")}>Reject</button>
        </div>
      ))}
      {data.friendsrequests.length < 1 && (
        <h1 style={{ textAlign: "center" }}>No requests</h1>
      )}
      <hr></hr>
      <div className="non-friends">
        {data.nonfriendusers.map((nf, index) => (
          <>
            <h1>{nf.username}</h1>
            <button onClick={() => SendRequest(nf.username)}>
              Send request
            </button>
          </>
        ))}
      </div>
    </div>
  );
};

export default FriendsRequests;
