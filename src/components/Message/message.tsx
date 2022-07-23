import React, { FC, useState } from "react";

export type MessageType = "info" | "success" | "error" | "warning";
interface MessageProps {
  duration: number;
  content: string;
  type: MessageType;
}

const Message: FC<MessageProps> = ({
  content,
  type,
  duration,
}: MessageProps) => {
  const [show, setShow] = useState(true);

  setTimeout(() => {
    setShow(false);
  }, duration - 200);

  return (
    <div
      className={`border rounded-md p-3 mt-2 ${
        show ? "animation-HideToDown" : "animation-HideToUp"
      }`}
    >
      <div className="text">{content}</div>
    </div>
  );
};

export default Message;
