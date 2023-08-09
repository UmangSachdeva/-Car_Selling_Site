import React, { useContext, useRef, useEffect } from "react";
import shopContext from "../../Context/shopContext";
import { formatDistanceToNow, subDays } from "date-fns";

function SingleMessage({ messages, isTyping }) {
  const scrollContainerRef = useRef(null);
  const context = useContext(shopContext);
  const { user, isSameUser } = context;

  const scrollToBottom = () => {
    scrollContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    console.log(messages);
  }, [messages, isTyping]);

  return (
    <div className="message-container">
      <ul id="messages">
        {messages &&
          messages.map((msg, index) => {
            return (
              <li
                className={`message-box ${
                  msg.sender._id === user._id ? "sender" : "receiver"
                } ${
                  isSameUser(messages, msg, index) ? "margin-2" : "margin-10"
                }`}
                key={index}
              >
                <span>{msg.message}</span>
                <span className="time-stamp">
                  {formatDistanceToNow(new Date(msg.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </li>
            );
          })}
        {isTyping && (
          <li className="message-box reciever">
            <div class="typingIndicatorContainer">
              <div class="typingIndicatorBubble">
                <div class="typingIndicatorBubbleDot"></div>
                <div class="typingIndicatorBubbleDot"></div>
                <div class="typingIndicatorBubbleDot"></div>
              </div>
            </div>
          </li>
        )}
        <div ref={scrollContainerRef}></div>
      </ul>
    </div>
  );
}

export default SingleMessage;
