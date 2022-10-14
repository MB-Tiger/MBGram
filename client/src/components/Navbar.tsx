import { Box } from "@mui/material";
import { AppBar } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
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
        <Box
          component="img"
          sx={{ width: "40px" }}
          src={require("../assets/img/MR.Logo2.png")}
          alt="Logo"
        />
        <Typography color="black" fontWeight="600" fontSize="18px">
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
