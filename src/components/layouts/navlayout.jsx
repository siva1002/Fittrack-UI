import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";


export const TopNavBar = ({ children }) => {
  const items = [
    { path: "/followers", name: "Followers" },
    { path: "/followings", name: "Following" },
    { path: "/workouts", name: "Workouts" },

  ];
  const useWebSockets = () => {
    React.useEffect(() => {
      const websocket = new WebSocket("ws://127.0.0.1:8000/ws/join/fit/3");
      websocket.onopen = () => {
        console.log("connected.....");
      };

      websocket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        // alert(msg.message)
        console.log(msg,event);
      };

      return () => {
        websocket.close()
      }
    }, []);
  };
// useWebSockets();
  return (
    <>
       
      <div className="top-nav-bar">
        {items.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            {item.name}
          </NavLink>
        ))}
         <NavLink to="/pendingrequests" key={2} className="link" activeclassName="active" style={{float:"right",marginRight:"4%"}} >Friendrequests</NavLink>
      </div>
      {console.log(children)}
     
      <main>{children}</main>
    </>
  );
};
