import React from "react";
import { Box, Typography } from "@mui/material";

interface userType {
  avatarImage?: string;
  email?: string;
  isAvatarImageSet?: boolean;
  password?: string;
  username?: string;
  __v?: number;
  _id?: string;
}

type props = {
  currentUser: userType | undefined;
  contacts: {
    avatarImage?: string;
    email?: string;
    username?: string;
    _id?: string;
  }[];
  changeChat: any;
  currentChatUser: userType | undefined;
};

const Contacts: React.FC<props> = ({
  contacts,
  currentUser,
  changeChat,
  currentChatUser,
}) => {
  console.log(contacts);
  console.log(currentUser);

  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        height: "100%",
        color: "white",
        backgroundColor: "#20202f",
        overflow: "auto",
      }}
    >
      <Box
        component="div"
        display="flex"
        alignItems="center"
        bgcolor="#30245c"
        gap="12px"
        p="16px"
      >
        <Box
          component="img"
          sx={{
            width: "55px",
            cursor: "pointer",
            borderRadius: "999px",
          }}
          src={`data:image/svg+xml;base64,${currentUser?.avatarImage}`}
          alt="avatar"
        />
        <Typography component="p" fontWeight="500">
          {currentUser?.username}
        </Typography>
      </Box>
      <Box component="section" height="100%" mt="16px" px="12px">
        {contacts?.map((contact) => (
          <Box
            key={contact._id}
            display="flex"
            alignItems="center"
            bgcolor="#3F3B52"
            borderRadius="4px"
            gap="12px"
            px="8px"
            py="12px"
            mb="16px"
            sx={{
              cursor: "pointer",
              transition: "0.3s linear",
              backgroundColor:
                contact._id === currentChatUser?._id ? "#4a4ab1" : null,
            }}
            onClick={() => changeChat(contact)}
          >
            <Box
              component="img"
              width="45px"
              borderRadius="999px"
              src={`data:image/svg+xml;base64,${contact.avatarImage}`}
              alt="avatar"
            />
            <Typography component="p">{contact.username}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Contacts;
