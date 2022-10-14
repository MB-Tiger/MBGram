import React, { useEffect, useState, useRef } from "react";
import ChatHeader from "../components/ChatHeader";
import Messages from "./Messages";
import ChatInput from "./ChatInput";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Toolbar } from "@mui/material";

interface UserType {
  avatarImage?: string;
  email?: string;
  isAvatarImageSet?: boolean;
  password?: string;
  username?: string;
  __v?: number;
  _id?: string;
}

interface MessagesType {
  fromSelf?: boolean;
  message?: string;
}

type props = {
  currentChatUser: UserType | undefined;
  currentUser: UserType | undefined;
  socket: any;
};

const ChatContainer: React.FC<props> = ({
  currentChatUser,
  currentUser,
  socket,
}) => {
  const [messages, setMessages] = useState<MessagesType[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<Object | null>(null);

  const scrollRef = useRef<any>();

  console.log(messages);

  useEffect(() => {
    if (currentChatUser) {
      axios
        .post("http://localhost:5000/api/messages/getmsg", {
          from: currentUser?._id,
          to: currentChatUser?._id,
        })
        .then((response) => setMessages(response.data))
        .catch((error) => {
          console.log(error);
          return toast.error("Somthing went wrong, Please try again", {
            theme: "colored",
          });
        });
    }
  }, [currentChatUser]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg: string) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (msg: string) => {
    await axios
      .post("http://localhost:5000/api/messages/addmsg", {
        from: currentUser?._id,
        to: currentChatUser?._id,
        message: msg,
      })
      .then((response) => console.log(response.data));

    socket.current.emit("send-msg", {
      from: currentUser?._id,
      to: currentChatUser?._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  return (
    <Box
      component="main"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      bgcolor="#131324"
      sx={{flexGrow: 1}}
    >
      <Toolbar />
      <ChatHeader currentChatUser={currentChatUser} />
      <Messages messages={messages} scrollRef={scrollRef} />
      <ChatInput sendMessage={sendMessage} />
    </Box>
  );
};

export default ChatContainer;
