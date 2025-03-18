import Toast from "react-native-toast-message";

type Props = {
  error: string;
  defaultMessage: string;
};

export default function errorMessage({ error, defaultMessage }: Props) {
  switch (error) {
    case "auth/invalid-email":
      Toast.show({
        type: "error",
        text1: "E-mail inválido.",
      });
      break;
    case "missing-password":
      Toast.show({
        type: "error",
        text1: "Preencha os campos obrigatórios.",
      });
      break;
    case "auth/invalid-credential":
      Toast.show({
        type: "error",
        text1: "Email e/ou Senha incorretos.",
      });
      break;
    case "auth/weak-password":
      Toast.show({
        type: "error",
        text1: "A senha deve conter no mínimo 6 caracteres.",
      });
      break;
    default:
      Toast.show({
        type: "error",
        text1: defaultMessage,
      });
  }
}
