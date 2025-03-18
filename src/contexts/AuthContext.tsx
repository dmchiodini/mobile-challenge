import { createContext, useEffect, useState } from "react";
import { AuthContextType, CreateSessionResponse } from "../@types/auth";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Snackbar } from "@react-native-material/core";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

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
          router.navigate("/");
        } else {
          setIsAuthenticated(false);
          router.navigate("/auth/login");
        }
      });
    } catch (err) {}
  };

  const login = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((resp) => {
        setUser({
          id: resp.user.uid,
          email: resp.user.email || "",
        });
        setIsAuthenticated(true);
        router.navigate("/");
      })
      .catch((error) => {
        console.log("Error: ", error.code);

        switch (error.code) {
          case "auth/invalid-email":
            Toast.show({
              type: "error",
              text1: "Preencha os campos obrigatórios",
            });
            break;
          case "missing-password":
            Toast.show({
              type: "error",
              text1: "Preencha os campos obrigatórios",
            });
            break;
          case "auth/invalid-credential":
            Toast.show({
              type: "error",
              text1: "Email e/ou Senha incorretos",
            });
            break;
          default:
            Toast.show({
              type: "error",
              text1: "Não foi possível efetuar login. Tente novamente!",
            });
        }
      });
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
