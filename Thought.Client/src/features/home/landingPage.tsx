import { useState, useEffect } from "react";
import BubbleText from "../components/bubbleText";
import BubbleForm from "../components/bubbleForm";

export default function LandingPage() {
  const [eventData, setEventData] = useState([""]);

  useEffect(() => {
    const socket = new WebSocket(
      "ws:///c5f33d76-fd50-4ca8-b864-a9aa8b77fc27.e1-us-east-azure.choreoapps.dev//ws"
    );

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
      <BubbleForm />

      <div>
        {eventData.map((message, index) => (
          <BubbleText key={index} text={message} />
        ))}
      </div>
    </div>
  );
}
