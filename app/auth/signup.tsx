import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function Signup() {
  return (
    <View style={styles.container}>
      <Text>TELA SIGNUP</Text>
      <Link href="/auth/login">
        <Text>Voltar!</Text>
      </Link>
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
