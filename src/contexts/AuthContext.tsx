import { createContext, useEffect, useState } from "react";
import { AuthContextType, CreateSessionResponse } from "../@types/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Snackbar } from "@react-native-material/core";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { createSession } from "../services/auth";
import { FirebaseError } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<CreateSessionResponse | null>(null);

  const Initialize = async () => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuthenticated(true);
          setUser({
            id: user.uid || "",
            email: user.email || "",
          });
          router.navigate("/");
        } else {
          setIsAuthenticated(false);
          router.replace("/auth/login");
        }
      });
    } catch (err) {}
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await createSession(email, password);

      if (response) {
        setUser({
          id: response.user.uid || "",
          email: response.user.email || "",
        });
        setIsAuthenticated(true);
      }
    } catch (error) {}
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setIsAuthenticated(false);
        setUser(null);
        router.navigate("/auth/login");
        return Toast.show({
          type: "success",
          text1: "Usuário deslogado!",
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
        return Toast.show({
          type: "error",
          text1: "Falha ao deslogar usuário!",
        });
      });
  };

  useEffect(() => {
    Initialize();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
