import { createContext, useState, useEffect, ReactNode } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext<any | null>(null);

interface Props {
  children?: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation()
  console.log(location)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
      if (user && location.pathname == "/signup") {
        axios
          .post("http://localhost:5000/api/auth/register", {
            username: user.displayName,
            email: user.email,
            password: user.displayName,
          })
          .then((response) => {
            if (response.data.status) {
              localStorage.setItem("MBGram-user", JSON.stringify(response.data.user))
              navigate("/")
            }
          });
      }

      if (user && location.pathname == "/login") {
        axios
          .post("http://localhost:5000/api/auth/login", {
            username: user.displayName,
            password: 1111,
          })
          .then((response) => {
            if (response.data.status) {
              localStorage.setItem("MBGram-user", JSON.stringify(response.data.user))
              navigate("/")
            }
          });
      }
      // console.log(user);
    });
  }, [user]);

  return (
    <AuthContext.Provider value={user}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
