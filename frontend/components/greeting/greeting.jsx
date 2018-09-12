import React from 'react';
import { Link } from "react-router-dom";

const Greeting = ( { currentUser, logout } ) => {

  if (currentUser) {
    return (
      <div>
        <h2>Welcome back, {currentUser.username}</h2>
        <button onClick={logout}></button>
      </div>
    );
  } else {
    // Question: What if I want the link to be a button?
    // Note: Actual routing happens in App
    return (
      <div>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </div>
    );
  }

};


export default Greeting;
