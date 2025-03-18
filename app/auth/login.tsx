import {
  Button,
  IconButton,
  Snackbar,
  Stack,
  TextInput,
} from "@react-native-material/core";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Link } from "expo-router";
import useAuth from "../../src/hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // const createUserLogin = async () => {
  //   const user = createUserWithEmailAndPassword(auth, email, pass);

  //   console.log("USER", user);
  // };

  const handleClick = () => {
    login(email, password)
      .then()
      .catch((err) => console.log("AQUI", err));
  };

  return (
    <Stack style={styles.container}>
      <ImageBackground
        source={require("../../src/assets/words.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Stack spacing={2} style={styles.areaLogin}>
          <Text style={styles.title}>
            Dictionary<Text style={{ color: "#2e2ed2" }}>EN</Text>
          </Text>

          <Stack style={styles.areaInput}>
            <TextInput
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              trailing={(props) => (
                <MaterialCommunityIcons
                  name="email"
                  {...props}
                  color="#2e2ed2"
                />
              )}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              secureTextEntry={!showPassword}
              placeholder="Senha"
              trailing={(props) => (
                <IconButton
                  onPress={() => setShowPassword(!showPassword)}
                  icon={(props) => (
                    <Entypo
                      name={showPassword ? "eye-with-line" : "eye"}
                      {...props}
                      color="#2e2ed2"
                    />
                  )}
                  {...props}
                />
              )}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </Stack>
          <Stack style={styles.areaButton}>
            <Button title="Acessar" onPress={handleClick}></Button>
          </Stack>

          <Stack>
            <Link href="/auth/signup">
              <Text style={{ color: "#2e2ed2", fontWeight: "bold" }}>
                Não tem conta? Cadastre-se!
              </Text>
            </Link>
          </Stack>
        </Stack>
        {error && (
          <Snackbar
            message="Falha no login."
            style={{ position: "absolute", start: 16, end: 16, bottom: 16 }}
          />
        )}
      </ImageBackground>
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  areaLogin: {
    backgroundColor: "rgba(256,256,256,0.9)",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
    paddingBottom: 40,
    gap: 20,
  },
  inputContainer: {
    backgroundColor: "#FFF",
  },
  input: {
    paddingTop: 10,
    color: "#2e2ed2",
  },
  title: {
    fontSize: 32,
    color: "#F00",
    fontWeight: 600,
  },
  areaInput: {
    width: "90%",
    gap: 10,
  },
  areaButton: {
    width: "90%",
  },
});
