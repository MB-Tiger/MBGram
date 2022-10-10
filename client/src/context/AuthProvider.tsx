import { createContext, useState, useEffect, ReactNode } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<any | null>(null);

interface Props {
  children?: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
      if (user) navigate("/");
      console.log(user);
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
