import React, { useState } from "react";
import ChatBotText from "./components/ChatBotText";
import ImageBot from "./components/ImageBot";
import './App.css';

function App() {
  const [isChatBotTextVisible, setIsChatBotTextVisible] = useState(true);

  const toggleComponent = () => {
    setIsChatBotTextVisible(!isChatBotTextVisible);
  };




  return (
    <div className="app-container">
      <div className="description-container">
      <div className="description">
        <h1> WildLife AI</h1>
     
      </div>

      <div className="switch-container">
        <button onClick={toggleComponent} className="switch-button">
          Click to {isChatBotTextVisible ? "generate Image" : "Wildlife Chat AI"}
        </button>
      </div>
      </div>
      

      <div className="component-container">
        {isChatBotTextVisible ? <ChatBotText /> : <ImageBot />}
      </div>
    </div>
  );
}

export default App;
