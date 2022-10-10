import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Chats from "../pages/Chats";
import ChatLayout from "../layouts/ChatLayout";
import Signup from "../pages/Signup";
import SetAvatar from "../pages/SetAvatar";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/setavatar" element={<SetAvatar />} />
      <Route element={<ChatLayout />}>
        <Route path="/" element={<Chats />} />
      </Route>
    </Routes>
  );
};

export default MyRoutes;
