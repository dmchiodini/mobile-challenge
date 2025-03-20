import { IconButton, TextInput } from "@react-native-material/core";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  collection,
  DocumentData,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { words } from "../../../words";
import Details from "../Details";

type Props = {
  title: string;
  typeList: "wordList" | "history" | "favorites";
};

export default function List({ typeList = "wordList", title }: Props) {
  const [search, setSearch] = useState("");
  const [wordList, setWordList] = useState<string[]>([]);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [word, setWord] = useState("");

  const getList = async () => {
    if (typeList === "wordList") {
      return setWordList(words);
    }

    try {
      let ref: any;

      switch (typeList) {
        case "history":
          ref = collection(db, "history");
          break;
        case "favorites":
          ref = collection(db, "favorites");
          break;
      }

      onSnapshot(ref, (snapshot: QuerySnapshot<unknown, DocumentData>) => {
        let favoriteWord: string[] = [];

        snapshot.forEach((item: DocumentData) => {
          favoriteWord.push(item.data().word);
        });

        setWordList(favoriteWord);
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const clearField = () => {
    setSearch("");
  };

  const handleClickItem = (word: string) => {
    setWord(word);
    setVisibleModal(true);
  };

  useEffect(() => {
    if (typeList === "wordList") {
      if (search !== "") {
        const newList = words.filter((value) => value === search);

        setWordList(newList);
      } else {
        setWordList(words);
      }
    }
  }, [search]);

  useEffect(() => {
    getList();
  }, []);

  return (
    <View style={styles.container}>
      <>
        {typeList === "wordList" && (
          <View style={styles.inputBox}>
            <TextInput
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              placeholder="Search..."
              trailing={(props) => {
                return search !== "" ? (
                  <>
                    <IconButton
                      onPress={clearField}
                      icon={(props) => (
                        <Ionicons name="close" {...props} color="#2e2ed2" />
                      )}
                    />
                  </>
                ) : (
                  <AntDesign name="search1" {...props} color="#2e2ed2" />
                );
              }}
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
          </View>
        )}

        {wordList.length > 0 ? (
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
        ) : (
          <View style={styles.emptyList}>
            <Text>The list is empty.</Text>
          </View>
        )}
      </>
      <Modal transparent={true} animationType="slide" visible={visibleModal}>
        <Details
          word={word}
          close={() => setVisibleModal(false)}
          wordList={typeList === "wordList" ? words : wordList}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  inputContainer: {
    backgroundColor: "#FFF",
  },
  inputBox: {
    padding: 16,
    width: "100%",
  },
  input: {
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
  emptyList: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
  },
});
