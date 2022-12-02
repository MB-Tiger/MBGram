import React from "react";
import { Box, Typography } from "@mui/material";

type props = {
  currentChatUser:
    | {
        avatarImage?: string;
        email?: string;
        isAvatarImageSet?: boolean;
        password?: string;
        username?: string;
        __v?: number;
        _id?: string;
      }
    | undefined;
};

const ChatHeader: React.FC<props> = ({ currentChatUser }) => {
  return (
    <Box
      component="div"
      display="flex"
      alignItems="center"
      position="relative"
      top="56.5px"
      px="20px"
      py="12px"
      gap="12px"
      color="white"
      bgcolor="#20202f"
      boxShadow="0 1px 2px 0 rgb(0 0 0 / 0.05)"
    >
      <Box
        component="img"
        sx={{ width: { xs: "45px", md: "55px" }, borderRadius: "999px" }}
        src={`data:image/svg+xml;base64,${currentChatUser?.avatarImage}`}
        alt="avatar"
      />
      <Typography component="p">{currentChatUser?.username}</Typography>
    </Box>
  );
};

export default ChatHeader;
