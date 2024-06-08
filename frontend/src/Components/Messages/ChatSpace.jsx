import React, { useContext, useEffect } from "react";
import ChatBox from "./ChatBox";
import ChatHeads from "./ChatHeads";
import shopContext from "../../Context/shopContext";

function ChatSpace() {
  const context = useContext(shopContext);
  const { setSelectedPage } = context;

  useEffect(() => {
    setSelectedPage("message");
  }, []);

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
