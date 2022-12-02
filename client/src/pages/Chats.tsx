import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import Contacts from "../components/Contacts";
import WelcomeUser from "../components/WelcomeUser";
import ChatContainer from "../components/ChatContainer";
import { Box, Drawer, Toolbar } from "@mui/material";

interface Props {
  window?: () => Window;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Chats = (props: Props) => {
  const { window, mobileOpen, handleDrawerToggle } = props;
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

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
    handleDrawerToggle();
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
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: "380px",
          flexShrink: 0,
          backgroundColor: "#20202f",
          display: { xs: "none", md: "block" },
          [`& .MuiDrawer-paper`]: { width: "380px", boxSizing: "border-box" },
        }}
        open
      >
        <Box sx={{ height: "61px", backgroundColor: "#20202f" }} />
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChangeChat}
          currentChatUser={currentChatUser}
        />
      </Drawer>
      <Drawer
        variant="temporary"
        container={container}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          flexShrink: 0,
          display: { xs: "block", md: "none" },
          [`& .MuiDrawer-paper`]: { width: "100%", boxSizing: "border-box" },
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
