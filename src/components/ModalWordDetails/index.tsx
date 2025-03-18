import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { IconButton } from "@react-native-material/core";
import { getWord } from "../../services/api";
import { WordDetails } from "../../@types/wordDetails";
import { Audio } from "expo-av";

type Props = {
  word: string;
  close: () => void;
};

export default function ModalWordDetails({ word, close }: Props) {
  const [sound, setSound] = useState<any>();
  const [wordDetails, setWordDetails] = useState<WordDetails>(
    {} as WordDetails
  );

  const getWordDetails = async () => {
    try {
      const response = await getWord(word);

      if (response) {
        setWordDetails(response || ({} as WordDetails));
      }
    } catch (error) {}
  };

  async function playSound() {
    const sound = new Audio.Sound();

    await sound.loadAsync({
      uri: wordDetails.audio,
    });

    await sound.playAsync();
  }

  useEffect(() => {
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

        <View style={styles.wordDetails}>
          <View style={styles.wordBox}>
            <Text style={styles.textBox}>{wordDetails?.word}</Text>
            <Text style={styles.textBox}>
              {wordDetails?.text && wordDetails?.text.replaceAll("/", "")}
            </Text>
            <View style={styles.audioButtonContainer}>
              <IconButton
                onPress={playSound}
                icon={(props) => (
                  <Ionicons name="play" {...props} color="#2e2ed2" size={30} />
                )}
              />
            </View>
          </View>

          <Text>{wordDetails.meanings}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f9f9f9",
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
    borderWidth: 1,
    borderColor: "#2e2ed2",
    borderRadius: 8,
    backgroundColor: "#ffc8c7",
    height: "25%",
    padding: 10,
    gap: 20,
    marginBottom: 20,
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
});
