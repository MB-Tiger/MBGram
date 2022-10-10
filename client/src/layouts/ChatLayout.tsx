import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Typography } from "@mui/material";

const ChatLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ChatLayout;
