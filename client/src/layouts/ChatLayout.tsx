import Navbar from "../components/Navbar";
import Chats from "../pages/Chats";
import { Box, CssBaseline } from "@mui/material";

const ChatLayout = () => {
  return (
    <Box display="flex" width="100%">
      <CssBaseline />
      <Navbar />
      <Chats />
    </Box>
  );
};

export default ChatLayout;
