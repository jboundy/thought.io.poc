import { useState } from "react";

export default function LandingPage() {
  const [eventDataText, setEventDataText] = useState("");
  const socket = new WebSocket("ws://localhost:5042/ws"); // Replace with your WebSocket endpoint URL

  socket.onopen = () => {
    console.log("WebSocket connection established.");
  };

  socket.onmessage = (event) => {
    const eventData = JSON.parse(event.data);
    setEventDataText(eventData);
    console.log("Received event:", eventData);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed.");
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the content of the Home page.</p>
    </div>
  );
}
