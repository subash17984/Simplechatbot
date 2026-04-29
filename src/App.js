import logo from './logo.svg';
import './App.css';
import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/chat/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setChat([...chat, { user: message, bot: data.answer }]);
    setMessage("");
  };

  return (
    <div>
      <h2 style={{textAlign:"center"}}>Ollama RAG Chatbot</h2>

      {chat.map((c, i) => (
        <div key={i}>
          <p><b>You:</b> {c.user}</p>
          <p><b>Bot:</b> {c.bot}</p>
        </div>
      ))}

      <input style={{height:"30px", width:"80%"}}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button style={{height:"32px", width:"10%"}} onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
