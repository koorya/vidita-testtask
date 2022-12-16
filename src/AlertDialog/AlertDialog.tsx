import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MessageType } from "../types";

export const AlertDialog = ({
  message,
  removeMessage,
}: {
  message?: MessageType;
  removeMessage: (message: MessageType) => void;
}) => {
  const handleDisagree = () => {
    if (!message) return;
    message.dismiss();
    removeMessage(message);
  };
  const handleAgree = () => {
    if (!message) return;
    message.accept();
    removeMessage(message);
  };
  return (
    <Dialog
      open={!!message}
      onClose={message?.dismiss}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Подтвердите действие"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message?.title}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAgree} autoFocus>
          Применить
        </Button>
        <Button onClick={handleDisagree}>Отклонить</Button>
      </DialogActions>
    </Dialog>
  );
};
