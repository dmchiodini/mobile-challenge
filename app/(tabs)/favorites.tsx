import { View, StyleSheet, StatusBar, Platform } from "react-native";
import List from "../../src/components/List";

export default function Favorites() {
  return (
    <View style={styles.container}>
      <List typeList="favorites" title="Favorites" />
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
