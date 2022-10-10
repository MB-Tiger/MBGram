import { Box, Container, Typography } from "@mui/material";

const WelcomeUser = ({ currentUser }: any) => {
  return (
    <Container
      component="div"
      sx={{
        height: "92.2vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        bgcolor: "#131324",
      }}
    >
      <Box
        component="img"
        width="550px"
        src={require("../assets/img/Wellcome.png")}
        alt="Welcome"
      />
      <Typography fontSize="20px" mt="20px">
        Welcome,{" "}
        <Typography
          component="span"
          color="#5b5bff"
          fontSize="24px"
          fontWeight="700"
        >
          {currentUser?.username}
        </Typography>
        <Typography>Please select a chat to start messaging</Typography>
      </Typography>
    </Container>
  );
};

export default WelcomeUser;
