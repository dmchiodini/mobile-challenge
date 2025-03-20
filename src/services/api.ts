import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { WordDetails } from "../@types/word";
import { words } from "../../words";
import { getWordHistory, saveWordInHistory } from "./myWords";

const api = axios.create({
  baseURL: "https://api.dictionaryapi.dev/api/v2/",
});

export const getWord = async (
  word: string
): Promise<WordDetails | undefined> => {
  try {
    const response = await api.get(`/entries/en/${word}`);

    const details = response.data[0];

    const wordDetails = {
      word: details?.word,
      text: details?.phonetics[0]?.text
        ? details?.phonetics[0]?.text
        : details?.phonetics[1]?.text,
      audio: details?.phonetics[0]?.audio
        ? details?.phonetics[0]?.audio
        : details?.phonetics[1]?.audio,
      synonyms: details?.meanings[0]?.synonyms,
      type: details?.meanings[0]?.partOfSpeech,
      meanings: details?.meanings?.map((v: any) => ({
        partOfSpeech: v?.partOfSpeech,
        definition: v?.definitions[0]?.definition,
        synonyms: v?.synonyms,
      })),
    };

    const history = await getWordHistory();

    if (history) {
      const wordExists = history.includes(word);

      if (!wordExists) {
        saveWordInHistory(word);
      }
    }

    return wordDetails;
  } catch (erro: any) {
    console.log("Error: ", erro);
  }
};
