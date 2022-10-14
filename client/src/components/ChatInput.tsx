import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Box, Typography, TextField } from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = ({ sendMessage }: any) => {
  const [showEmoji, setShowEmoji] = useState<Boolean>(false);
  const [msg, setMsg] = useState<String>("");

  const handleEmojiClick = (e: any, emoji: any) => {
    let message = msg;
    message += e.emoji;
    setMsg(message);
  };

  const sendMessageToChat = () => {
    if (msg.length) {
      sendMessage(msg);
      setMsg("");
    }
  };

  return (
    <Box
      component="div"
      width="100%"
      position="relative"
      display="flex"
      alignItems="center"
      gap="16px"
      px="20px"
      py="15px"
    >
      <EmojiEmotionsIcon
        sx={{ cursor: "pointer", fontSize: "30px", color: "#FFC83D" }}
        onClick={() => setShowEmoji(!showEmoji)}
      />
      {showEmoji && (
        <Box position="absolute" top="-460px">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </Box>
      )}

      <TextField
        type="text"
        variant="standard"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        fullWidth
        sx={{
          bgcolor: "#ffffff34",
          borderRadius: "999px",
          px: "16px",
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") sendMessageToChat();
        }}
      />
      <SendIcon
        color="primary"
        sx={{ fontSize: "30px", cursor: "pointer" }}
        onClick={() => sendMessageToChat()}
      />
    </Box>
  );
};

export default ChatInput;
