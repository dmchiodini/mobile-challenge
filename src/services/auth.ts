import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "@firebase/auth";
import { auth } from "../../firebaseConfig";
import { CreateSession, CreateSessionResponse } from "../@types/auth";
import Toast from "react-native-toast-message";
import { FirebaseError } from "firebase/app";
import errorMessage from "../utils/errorMessage";

export const createSession = async (
  email: string,
  password: string
): Promise<UserCredential | undefined> => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (error) {
    console.log("Error: ", error);
    if (error instanceof FirebaseError) {
      errorMessage({
        error: error.code,
        defaultMessage: "Não foi possível efetuar login. Tente novamente!",
      });
    }
  }
};

export const createUser = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return Toast.show({
      type: "success",
      text1: "Usuário criado com sucesso!",
    });
  } catch (error) {
    console.log("Error: ", error);
    if (error instanceof FirebaseError) {
      errorMessage({
        error: error.code,
        defaultMessage: "Não foi possível cadastrar usuário. Tente novamente!",
      });
    }
  }
};
