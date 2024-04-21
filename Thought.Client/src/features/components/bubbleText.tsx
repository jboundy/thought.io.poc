import { useState, useEffect } from "react";
import "../../assets/bubleText.css";

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

  // Render only if there is text
  return text ? (
    <div
      className="moving-text"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`, // Use transform for smooth transition
      }}
    >
      <h1>{text}</h1>
    </div>
  ) : null;
}
