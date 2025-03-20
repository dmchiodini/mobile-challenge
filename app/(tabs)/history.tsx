import { View, Text, StyleSheet, StatusBar, Platform } from "react-native";
import List from "../../src/components/List";

export default function History() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <Text style={styles.subTitle}>History of the words you visited.</Text>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e2ed2",
    marginTop: 10,
    marginBottom: 5,
  },
  subTitle: {
    marginBottom: 10,
  },
});
