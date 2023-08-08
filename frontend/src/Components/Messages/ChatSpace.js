import React from "react";
import ChatBox from "./ChatBox";
import ChatHeads from "./ChatHeads";

function ChatSpace() {
  return (
    <div className="chat-container">
      <div className="chathead-container">
        <ChatHeads />
      </div>
      <div className="chatspace-container">
        <ChatBox />
      </div>
    </div>
  );
}

export default ChatSpace;
