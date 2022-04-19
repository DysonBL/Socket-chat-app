import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:4001");
const App = () => {
  
  const [message, setMessage] = useState("");
  const [msgRecive, setMsgRecive] = useState("");


  const sendMessage = (event) => {
    socket.emit("send_message", { message: message });
    setMessage(event.target.value);
  };
  useEffect(() => {
    socket.on("recive_message", (data) => {
      setMsgRecive(data.message);
    });
  },[]);

  return (
    <div className="App">
      <div className=" row-6 row-md-6">
        <div className="col-6">
          <h1>learn socketio</h1>
          <input
            type="text"
            placeholder="Enter messages.."
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <p>Message:{message}</p> 
          <p>{msgRecive}</p>
    
        </div>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App
