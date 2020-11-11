/*    Game room.    */

// Setup.
import React from "react";
import ChatBox from "./ChatBox";
import MyEngineBoard from "./chess/MyEngineBoard";
import MyHumanBoard from "./chess/MyHumanBoard";

function Game(props) {

  // const [user, setUser] = React.useState(props.loggedUser)

  // useEffect(() => {
  //   if (!loggedUser) {
  //     axios.get(`${API_URL}/user`, { withCredentials: true }).then((res) => {
  //       setLoggedUser(res.data);
  //     });
  //   }
  // }, []);

  if (!props.loggedUser) {
    //show loading screen or
    return null
  }

  return props.match.path === "/stockfish" ? (
    <>
      <MyEngineBoard />
    </>
  ) : (
    <>
      <MyHumanBoard loggedUser={props.loggedUser} {...props} />
      <ChatBox loggedUser={props.loggedUser} {...props} />
    </>
  );
}

export default Game;
