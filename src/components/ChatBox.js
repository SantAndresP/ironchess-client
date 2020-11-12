import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../styles/ChatBox.css";

import { URL } from "../config";
let socket;
const CONNECTION_PORT = `${URL}`;

function ChatBox(props) {
  if (!props.loggedUser) {
    //show loading screen or
    return null;
  }

  const room = props.match.params.id;
  const userName = props.loggedUser.username;

  // After Login
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
    socket.emit("join_room", room);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });

  const sendMessage = async () => {
    let messageContent = {
      room: room,
      content: {
        author: userName,
        message: message,
      },
    };

    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };

  return (
    <div className="ChatBox">
      <div className="chatContainer">
        <div className="messages">
          {messageList.map((val) => {
            return (
              <div
                className="messageContainer"
                id={val.author == userName ? "You" : "Other"}
              >
                <div className="messageIndividual">
                  {val.author}: {val.message}
                </div>
              </div>
            );
          })}
        </div>

        <div className="messageInputs">
          <input
            type="text"
            placeholder="Message..."
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
