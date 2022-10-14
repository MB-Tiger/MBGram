import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import Contacts from "../components/Contacts";
import WelcomeUser from "../components/WelcomeUser";
import ChatContainer from "../components/ChatContainer";
import { Grid, Box, Drawer, Toolbar, CssBaseline } from "@mui/material";

interface Props {
  window?: () => Window;
}

const Chats = (props: Props) => {
  const {window} = props
  interface currentUserData {
    avatarImage?: string;
    email?: string;
    isAvatarImageSet?: boolean;
    password?: string;
    username?: string;
    __v?: number;
    _id?: string;
  }

  interface contactsType {
    avatarImage?: string;
    email?: string;
    username?: string;
    _id?: string;
  }

  const [contacts, setContacts] = useState<contactsType[]>([]);
  const [currentUser, setCurrentUser] = useState<currentUserData | undefined>(
    undefined
  );
  const [currentChatUser, setCurrentChatUser] = useState<
    currentUserData | undefined
  >(undefined);

  const navigate = useNavigate();
  const socket = useRef<any>();

  const container = window !== undefined ? () => window().document.body : undefined;

  // console.log(contacts);
  // console.log(currentUser);

  useEffect(() => {
    const checkLogin = async () => {
      if (!localStorage.getItem("MBGram-user")) navigate("/login");
      else
        setCurrentUser(
          await JSON.parse(localStorage.getItem("MBGram-user") || "{}")
        );
    };
    checkLogin();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  const handleChangeChat = (chatUser: currentUserData | undefined) => {
    setCurrentChatUser(chatUser);
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser?.isAvatarImageSet) {
        axios
          .get(`http://localhost:5000/api/auth/allusers/${currentUser._id}`)
          .then((response) => setContacts(response.data))
          .catch((error) => console.log(error));
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);

  return (
    // <Grid container columns={{ xs: 6, sm: 4 }}>
    //   <Grid item xs={2} sm={1}>
    //     <Contacts
    //       contacts={contacts}
    //       currentUser={currentUser}
    //       changeChat={handleChangeChat}
    //       currentChatUser={currentChatUser}
    //     />
    //   </Grid>
    //   <Grid item xs={4} sm={3}>
    //     {currentChatUser ? (
    //       <ChatContainer currentChatUser={currentChatUser} currentUser={currentUser} socket={socket} />
    //     ) : (
    //       <WelcomeUser currentUser={currentUser} />
    //     )}
    //   </Grid>
    // </Grid>
    <>
      <Drawer
        variant="persistent"
        container={container}
        open={true}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: "380px",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: "380px", boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChangeChat}
          currentChatUser={currentChatUser}
        />
      </Drawer>
      {currentChatUser ? (
        <ChatContainer
          currentChatUser={currentChatUser}
          currentUser={currentUser}
          socket={socket}
        />
      ) : (
        <WelcomeUser currentUser={currentUser} />
      )}
    </>
  );
};

export default Chats;
