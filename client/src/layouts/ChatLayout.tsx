import { useState } from "react";
import Navbar from "../components/Navbar";
import Chats from "../pages/Chats";
import { Box, CssBaseline } from "@mui/material";

const ChatLayout = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box display="flex" width="100%">
      <CssBaseline />
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Chats mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
    </Box>
  );
};

export default ChatLayout;
