

import React, { useState, useCallback } from 'react';
import './ChatBotText.css';

const ChatBotText = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [messages, setMessages] = useState([
    {  }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'text', content: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    console.log("inputt::::", input)

    await generateBotResponse(input);
  };

  const updateMessage = useCallback((responseText) => {
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      const lastMessage = newMessages[newMessages.length - 1];
      if (lastMessage && lastMessage.sender === 'bot') {
        lastMessage.content = responseText;
      } else {
        newMessages.push({ type: 'text', content: responseText, sender: 'bot' });
      }
      return newMessages;
    });
  }, []);

  const generateBotResponse = async (message) => {
    try {
      const response = await fetch(`${BASE_URL}/api/chat-complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.text(); // Since the backend returns a plain text response
      console.log("data from backend:", data);

      let responseText = '';
      // Simulate typing effect by displaying the response one character at a time
      for (let i = 0; i < data.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 50)); // Delay for typing effect
        responseText += data[i];
        updateMessage(responseText); // Update the message progressively
      }
    } catch (error) {
      console.error('Error fetching bot response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'text', content: 'Sorry, I encountered an error. Please try again later.', sender: 'bot' },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="container">
      <div className="chat-header">Chat AI</div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {/* {msg.type === 'text' ? ( */}
              <div className="text">{msg.content}</div>
            {/* ) : ( */}
              {/* <img src={msg.content} alt="generated" className="image" /> */}
            {/* )} */}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input"
          placeholder="Type here..."
        />
        <button onClick={handleSendMessage} className="button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBotText;
