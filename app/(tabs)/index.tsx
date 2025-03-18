import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  FlatList,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useEffect, useState } from "react";
import { words } from "../../words";
import { IconButton, TextInput } from "@react-native-material/core";
import { AntDesign } from "@expo/vector-icons";
import ModalWordDetails from "../../src/components/ModalWordDetails";

export default function WordList() {
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [wordList, setWordList] = useState(words);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [word, setWord] = useState("");

  useEffect(() => {
    if (search !== "") {
      const newList = words.filter((value) => value === search);

      setWordList(newList);
    } else {
      setWordList(words);
    }
  }, [search]);

  const handleClickItem = (word: string) => {
    setWord(word);
    setVisibleModal(true);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color="#121212" size={45} />
      ) : (
        <>
          <Text style={styles.title}>Word List</Text>
          <View style={styles.inputBox}>
            <TextInput
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              placeholder="Search..."
              trailing={(props) => (
                <AntDesign name="search1" {...props} color="#2e2ed2" />
              )}
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
          </View>
          <FlatList
            style={styles.list}
            data={wordList}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.wordContainer}
                onPress={() => handleClickItem(item)}
              >
                <Text style={styles.word} numberOfLines={3}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
      <Modal transparent={true} animationType="slide" visible={visibleModal}>
        <ModalWordDetails word={word} close={() => setVisibleModal(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignItems: "center",
    paddingBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2e2ed2",
  },
  inputContainer: {
    backgroundColor: "#FFF",
  },
  inputBox: {
    padding: 16,
    width: "100%",
  },
  input: {
    paddingTop: 10,
    color: "#2e2ed2",
  },
  list: {
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
  },
  containerList: {
    width: "100%",
  },
  wordContainer: {
    flex: 1,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#2e2ed2",
    borderRadius: 8,
    marginBottom: 5,
  },
  word: {
    fontWeight: "bold",
    color: "#2e2ed2",
  },
});
