import { router } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import useAuth from "../src/hooks/useAuth";

export default function Home() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text>TELA HOME</Text>
      <Pressable onPress={logout}>
        <Text>Sair</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
