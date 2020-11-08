import React from "react";

function PrivateProfile(props) {
  return (
    <div>
      <p>{props.loggedUser.username}</p>
      <p>{props.loggedUser.games}</p>
      <p>{props.loggedUser.elo}</p>
    </div>
  );
}

export default PrivateProfile;
