import { useState, useEffect } from "react";
import "../../assets/bubleText.css";
import BubbleTextImage from "../../assets/images/BubbleOutput.jpg";

interface BubbleTextProps {
  text: string;
}

export default function BubbleText({ text }: BubbleTextProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveText = () => {
      // Get window dimensions
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Calculate new position within the visible area of the window
      const newX = Math.max(
        0,
        Math.min(windowWidth - 200, Math.random() * windowWidth)
      );
      const newY = Math.max(
        0,
        Math.min(windowHeight - 50, Math.random() * windowHeight)
      );

      setPosition({ x: newX, y: newY });
    };

    // Move the text every second
    const intervalId = setInterval(moveText, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, []); // Run effect only once on component mount

  return text ? (
    <div className="image-container">
      <div
        className="moving-text"
        style={{
          position: "relative",
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <img src={BubbleTextImage} alt="Image" className="image" />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
          <h1 style={{ backgroundColor: "black" }}>{text}</h1>
        </div>
      </div>
    </div>
  ) : null;
}
