import { useState, useEffect } from "react";
import BubbleText from "../components/bubbleText";

export default function LandingPage() {
  const [eventData, setEventData] = useState([""]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5042/ws");

    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
      // Update the state using a callback function
      setEventData((prevData) => [...prevData, event.data]);

      setTimeout(() => {
        // Remove the message after 5 seconds
        setEventData((prevData) =>
          prevData.filter((msg) => msg !== event.data)
        );
      }, 5000);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    // Cleanup function to close the WebSocket connection
    return () => {
      socket.close();
    };
  }, []); // Run effect only once on component mount

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the content of the Home page.</p>

      <div>
        <h2>Event Data</h2>
        {eventData.map((message, index) => (
          <BubbleText key={index} text={message} />
        ))}
      </div>
    </div>
  );
}
