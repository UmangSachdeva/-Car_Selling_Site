import React, { useContext, useRef, useEffect } from "react";
import shopContext from "../../Context/shopContext";
import { Skeleton } from "@mui/material";
import { formatDistanceToNow, subDays } from "date-fns";

function SingleMessage() {
  const scrollContainerRef = useRef(null);
  const context = useContext(shopContext);
  const { user, isSameUser, isTyping, messages, loading, setLoading } = context;

  const scrollToBottom = () => {
    scrollContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    console.log("typing");
  }, [messages, isTyping]);

  return (
    <div className="message-container">
      <ul id="messages">
        {loading && (
          <>
            <li className={`message-box sender `} style={{ minWidth: "20%" }}>
              <span>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </span>
            </li>
            <li
              className={`message-box receiver`}
              style={{
                minWidth: "20%",
              }}
            >
              <span>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </span>
            </li>
          </>
        )}
        {!loading &&
          messages &&
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
