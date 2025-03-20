import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Button, IconButton } from "@react-native-material/core";
import { Audio } from "expo-av";
import { words } from "../../../words";
import {
  getFavoriteWords,
  removeFavoriteWord,
  saveWordInFavorites,
} from "../../services/myWords";
import { useWord } from "../../hooks/useWord";

type Props = {
  word: string;
  close: () => void;
  wordList: any[];
};

export default function Details({ word, close, wordList }: Props) {
  const [index, setIndex] = useState(wordList.indexOf(word));
  const [favoriteWord, setFavoriteWord] = useState({ id: "", favorite: false });
  const [loading, setLoading] = useState(false);

  const details = useWord(wordList[index]);

  const getWordDetails = async () => {
    setLoading(true);

    const newDetails = await details.refetch();
    const favorites = await getFavoriteWords();

    if (newDetails.data) {
      const findFavorite = favorites?.find(
        (favorite) => favorite.word === newDetails.data?.word
      );

      if (findFavorite) {
        setFavoriteWord({
          id: findFavorite.id,
          favorite: true,
        });
      } else {
        setFavoriteWord({
          id: "",
          favorite: false,
        });
      }
    }
    setLoading(false);
  };

  async function playSound() {
    const sound = new Audio.Sound();

    await sound.loadAsync({
      uri: details.data ? details.data.audio : "",
    });

    await sound.playAsync();
  }

  const handleBack = () => {
    const newIndex = index - 1 < 0 ? 0 : index - 1;
    setIndex(newIndex);

    getWordDetails();
  };

  const handleNext = () => {
    const newIndex =
      index + 1 > words.length - 1 ? words.length - 1 : index + 1;
    setIndex(newIndex);

    getWordDetails();
  };

  const handleFavorite = async () => {
    const newFavoriteState = !favoriteWord.favorite;
    setFavoriteWord({ ...favoriteWord, favorite: !favoriteWord.favorite });

    if (newFavoriteState) {
      details.data?.word && (await saveWordInFavorites(details.data?.word));
    } else {
      await removeFavoriteWord(favoriteWord.id);
    }
  };

  useEffect(() => {
    const findIndex: number = wordList.indexOf(word);
    setIndex(findIndex);

    getWordDetails();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <View style={styles.closeButton}>
          <IconButton
            onPress={close}
            icon={(props) => (
              <Ionicons name="close" {...props} color="#2e2ed2" />
            )}
          />
        </View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={45} />
          </View>
        ) : (
          <View style={styles.wordDetails}>
            <View style={styles.wordBox}>
              <Text style={styles.textBox}>{wordList[index]}</Text>
              <Text style={styles.textBox}>
                {details.data?.text && details.data.text.replaceAll("/", "")}
              </Text>
              {details.data && (
                <>
                  <View style={styles.favoriteButtonContainer}>
                    <IconButton
                      onPress={handleFavorite}
                      icon={(props) => (
                        <FontAwesome
                          name={favoriteWord.favorite ? "star" : "star-o"}
                          {...props}
                          color={favoriteWord.favorite ? "#F1AF09" : "#A4A4A4"}
                          size={30}
                        />
                      )}
                    />
                  </View>
                  {details.data.audio && (
                    <View style={styles.audioButtonContainer}>
                      <IconButton
                        onPress={playSound}
                        icon={(props) => (
                          <Ionicons
                            name="play"
                            {...props}
                            color="#2e2ed2"
                            size={30}
                          />
                        )}
                      />
                    </View>
                  )}
                </>
              )}
            </View>

            {!loading && (
              <View style={styles.detailsBox}>
                <Text style={styles.title}>Meanings</Text>
                {!details.data ? (
                  <View style={styles.groupDetails}>
                    <Text>
                      Sorry, we couldn't find definitions for the word you were
                      looking for.
                    </Text>
                  </View>
                ) : (
                  <ScrollView style={styles.groupDetails}>
                    {details.data?.meanings?.map((detail, index) => (
                      <React.Fragment key={index}>
                        <View style={styles.contentBox}>
                          <Text style={styles.titleContent}>
                            Part of speech:
                          </Text>
                          <Text style={styles.textContent}>
                            {detail?.partOfSpeech}
                          </Text>
                        </View>
                        <View style={styles.contentBox}>
                          <Text style={styles.textContent}>
                            {detail?.definition}
                          </Text>
                        </View>
                        <View style={styles.contentBox}>
                          {detail.synonyms.length > 0 && (
                            <>
                              <Text style={styles.titleContent}>Synonyms:</Text>
                              <Text style={styles.textContent}>
                                {detail?.synonyms.join(", ")}
                              </Text>
                            </>
                          )}
                        </View>
                      </React.Fragment>
                    ))}
                  </ScrollView>
                )}
              </View>
            )}

            <View style={styles.buttonBox}>
              <Button
                title="Previous"
                style={styles.button}
                onPress={handleBack}
                disabled={index === 0}
              />
              <Button
                title="Next"
                style={styles.button}
                onPress={handleNext}
                disabled={index === wordList.length - 1}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 60 : 0,
  },
  modalContent: {
    width: "100%",
    flex: 1,
    backgroundColor: "#f9f9f9",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  wordDetails: {
    height: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  closeButton: {
    marginBottom: 20,
  },
  wordBox: {
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#2e2ed2",
    borderRadius: 8,
    backgroundColor: "#ffe4e1",
    height: "25%",
    padding: 10,
    gap: 20,
    marginBottom: 30,
  },
  textBox: {
    fontSize: 22,
    color: "#2e2ed2",
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  audioButtonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  favoriteButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  detailsBox: {
    marginBottom: 10,
    height: "55%",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2e2ed2",
  },
  titleContent: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textContent: {
    fontSize: 16,
    marginBottom: 2,
    marginLeft: 5,
  },
  groupDetails: {
    marginBottom: 15,
    marginLeft: 5,
    marginRight: 5,
    flexGrow: 0,
  },
  contentBox: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonBox: {
    flexDirection: "row",
    width: "100%",
    height: "auto",
    gap: 20,
  },
  button: {
    flex: 1,
  },
  loadingContainer: {
    height: "100%",
    justifyContent: "center",
    marginTop: -80,
  },
});
