import React from "react";
import { Box, AppBar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

type props = {
  handleDrawerToggle: () => void;
};

const Navbar: React.FC<props> = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();

  const logOutHandler = async () => {
    await auth.signOut();
    localStorage.removeItem("MBGram-user");
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        height: "56.5px",
        backgroundColor: "#efefef",
        padding: "10px 25px",
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Box component="div" display="flex" alignItems="center" gap="10px">
        <IconButton
          color="error"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          component="img"
          sx={{ width: { xs: "30px", md: "40px" } }}
          src={require("../assets/img/MR.Logo2.png")}
          alt="Logo"
        />
        <Typography
          color="black"
          fontWeight="600"
          sx={{ fontSize: { xs: "16px", md: "18px" } }}
        >
          MBGram
        </Typography>
      </Box>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => logOutHandler()}
      >
        Log out
      </Button>
    </AppBar>
  );
};

export default Navbar;
