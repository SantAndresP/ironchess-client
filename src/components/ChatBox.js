import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../styles/ChatBox.css";

import { URL } from "../config";
import {
  Button,
  Card,
  Form,
  FormControl,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
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
    <Card className="myChatBoxCard">
      <ListGroup>
        {messageList.map((val) => {
          return (
            <ListGroup.Item
              variant={val.author == userName ? "primary" : "success"}
            >
              <b>{val.author}:</b> {val.message}
            </ListGroup.Item>
          );
        })}
      </ListGroup>

      <InputGroup className="mb-3" className="myChatInput">
        <FormControl
          type="text"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="WRITE..."
        />
        <InputGroup.Append>
          <Button onClick={sendMessage} variant="primary">
            Send
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Card>
  );
}

export default ChatBox;
