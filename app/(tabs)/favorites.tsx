import { router } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import useAuth from "../../src/hooks/useAuth";

export default function Favorites() {
  const { logout } = useAuth();
  return (
    <View style={styles.container}>
      <Text>TELA Favorites</Text>
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
