import { Button, IconButton, TextInput } from "@react-native-material/core";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";
import useAuth from "../../src/hooks/useAuth";
import { Stack } from "expo-router";
import { createUser } from "../../src/services/auth";

export default function Signup() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    await createUser(email, password);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "",
          headerShown: true,
          headerLeft: () => (
            <Pressable
              style={styles.buttonHeader}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" color="#2e2ed2" size={20} />
              <Text style={styles.textButtonHeader}>Login</Text>
            </Pressable>
          ),
        }}
      />
      <View style={styles.areaLogin}>
        <Text style={styles.title}>Cadastre-se</Text>

        <View style={styles.areaInput}>
          <TextInput
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
            placeholder="E-mail"
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
        </View>
        <View style={styles.areaButton}>
          <Button title="Cadastrar" onPress={handleClick}></Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  buttonHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  textButtonHeader: {
    color: "#2e2ed2",
    fontSize: 16,
    fontWeight: 500,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  areaLogin: {
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
