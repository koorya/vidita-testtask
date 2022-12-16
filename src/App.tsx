import React, { useState } from "react";
import { AlertDialog } from "./AlertDialog/AlertDialog";

import { Table } from "./table/Table";
import { MessageType } from "./types";

export const App = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const addMessage = (message: MessageType) => {
    setMessages([...messages, message]);
  };
  const removeMessage = (message: MessageType) => {
    setMessages([...messages.filter((m) => m != message)]);
  };

  return (
    <>
      <Table addMessage={addMessage} />
      <AlertDialog
        message={messages[messages.length - 1]}
        removeMessage={removeMessage}
      />
    </>
  );
};
