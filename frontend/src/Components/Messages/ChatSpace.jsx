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

  if (window.innerWidth < 786) {
    return (
      <div className="chatspace-container mobile:w-full">
        {/* <ChatHeads />
        <div className="w-full mt-10 mb-10">
          <ChatBox />
        </div> */}

        <ChatHeads />
        <div className="mb-[375px] chatspace-container h-[80vh] mobile:w-full">
          <ChatBox />
        </div>
      </div>
    );
  }
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
