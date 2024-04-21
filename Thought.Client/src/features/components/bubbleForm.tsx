import { useState } from "react";
import agent from "../../api/agent";
import "../../assets/bubbleForm.css";
import BubbleFormImage from "../../assets/images/BubbleForm.jpg";

export default function BubbleForm() {
  const [inputText, setInputText] = useState(""); // State to manage input field value

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputText.trim() !== "") {
      const payload = {
        data: inputText.trim(),
      };
      await agent.thought.newMessage(payload);
      setInputText("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  return (
    <div className="image-container">
      <img src={BubbleFormImage} alt="Image" className="image" />
      <form className="text-form">
        <input
          type="text"
          placeholder="Enter some text"
          value={inputText}
          onChange={handleInputChange}
        />
        <button type="submit" onClick={handleClick} className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}
