import React from "react";
import { Box, Typography } from "@mui/material";

type props = {
  messages: {
    fromSelf?: boolean;
    message?: string;
  }[];
  scrollRef: any
};

const Messages: React.FC<props> = ({ messages, scrollRef }) => {
  return (
    <Box
      component="section"
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      gap="1rem"
      overflow="auto"
      color="white"
      p="1rem 2rem"
      sx={{overflowY: "auto"}}
    >
      {messages.length ? messages.map((message, i) => (
        <Box
          key={i}
          ref={scrollRef}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: message.fromSelf ? "flex-end" : "flex-start",
          }}
        >
          <Box
            sx={{
              maxWidth: "80%",
              overflowWrap: "break-word",
              p: "1rem",
              fontSize: "1.1rem",
              borderRadius: "1rem",
              color: "#d1d1d1",
              backgroundColor: message.fromSelf ? "#4a4ab1" : "#9900ff20",
            }}
          >
            <Typography>{message.message}</Typography>
          </Box>
        </Box>
      )) : <div>No Message yet!</div>
      }
    </Box>
  );
};

export default Messages;
