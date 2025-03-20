import { View, StyleSheet, StatusBar, Platform } from "react-native";
import List from "../../src/components/List";

export default function History() {
  return (
    <View style={styles.container}>
      <List typeList="history" title="History" />
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
});
