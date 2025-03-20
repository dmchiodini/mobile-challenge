import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform,
} from "react-native";
import List from "../../src/components/List";
import useAuth from "../../src/hooks/useAuth";
import { MaterialIcons } from "@expo/vector-icons";

export default function WordList() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.outButton}>
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.text}>Sair</Text>
          <MaterialIcons name="logout" color="#2e2ed2" size={14} />
        </TouchableOpacity>
      </View>
      <List typeList="wordList" title="Word List" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 60 : StatusBar.currentHeight,
    alignItems: "center",
    paddingBottom: 5,
  },
  outButton: {
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  text: {
    color: "#2e2ed2",
    fontWeight: "bold",
  },
});
