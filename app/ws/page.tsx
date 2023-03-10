"use client";

import { useState, useEffect } from "react";

import ws from "datasources/ws";

export default function Ws() {
  const [message, setMessage] = useState<any>("");
  const [chatList, setChatList] = useState<any>([]);

  useEffect(() => {
    ws.on("RECEIVE_MESSAGE", (data: any) => {
      setChatList(data.chatList);
    });
  }, [ws]);

  useEffect(() => {
    ws.emit("JOIN_ROOM", {
      nickname: "나",
    });
  }, []);

  const postMessage = () => {
    ws.emit("SEND_MESSAGE", {
      message: message,
    });
  };

  const onChange = (e: any) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <input onChange={onChange} value={message} />
      <div onClick={postMessage}>전송하기</div>
      <div>
        {chatList.map((el: any, index: any) => (
          <div key={index}>{el}</div>
        ))}
      </div>
    </div>
  );
}
