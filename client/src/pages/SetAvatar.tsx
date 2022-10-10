import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SetAvatar = () => {
  const [avatars, setAvatars] = useState<String[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  const navigate = useNavigate();
  const avatarApi = "https://api.multiavatar.com/45678945";

  useEffect(() => {
    if (!localStorage.getItem("MBGram-user")) navigate("/login");

    const data: any = [];

    for (let i = 0; i < 4; i++) {
      const fetchApi = async () => {
        const image = await axios.get(
          `${avatarApi}/${Math.round(Math.random() * 1000)}`
        );

        // console.log(image.data)
        const buffer: any = new Buffer(image.data);
        data.push(buffer.toString("base64"));
        setAvatars(data);
      };
      fetchApi();
      // console.log(data)
    }
    // setAvatars(data)
    setIsLoading(false);
  }, []);

  // console.log(avatars);

  const setProfileAvatar = async () => {
    if (!selectedAvatar || selectedAvatar === null)
      return toast.error("Please select an avatar", { theme: "colored" });

    const user = await JSON.parse(localStorage.getItem("MBGram-user") || "{}");

    const { data } = await axios.post(
      `http://localhost:5000/api/auth/setAvatar/${user._id}`,
      {
        image: avatars[selectedAvatar],
      }
    );
    console.log(data);

    if (data.isSet) {
      user.isAvatarImageSet = true;
      user.avatarImage = data.image;
      localStorage.setItem("MBGram-user", JSON.stringify(user));
      navigate("/");
    } else {
      return toast.error("Error setting avatar, Please try again", {
        theme: "colored",
      });
    }
  };

  return (
    <Box
      component={"div"}
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "3rem",
        backgroundColor: "#131324",
      }}
    >
      <Typography component="h2" variant="h4" color="white">
        Pick an avatar as your profile picture
      </Typography>
      <Box
        component={"div"}
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        gap="32px"
      >
        {!isLoading ? (
          avatars?.map((avatar, i) => (
            <Box
              component="img"
              key={i}
              sx={{
                width: "100px",
                cursor: "pointer",
                borderRadius: "999px",
                border: selectedAvatar == i ? "4px solid red" : null,
              }}
              src={`data:image/svg+xml;base64,${avatar}`}
              alt="avatar"
              onClick={() => setSelectedAvatar(i)}
            />
          ))
        ) : (
          <CircularProgress />
        )}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setProfileAvatar()}
      >
        Set as profile picture
      </Button>
    </Box>
  );
};

export default SetAvatar;
