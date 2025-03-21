import axios from "axios";
import { HistoryWord, WordDetails } from "../@types/word";
import { getWordHistory, saveWordInHistory } from "./myWords";

const api = axios.create({
  baseURL: "https://api.dictionaryapi.dev/api/v2/",
});

export const getWord = async (
  word: string,
  userId: string
): Promise<WordDetails | null> => {
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

    const history = await getWordHistory(userId);

    if (history) {
      const wordExists = history.includes(word);

      if (!wordExists) {
        saveWordInHistory(word, userId);
      }
    }

    return wordDetails;
  } catch (error: any) {
    console.log("Erro: ", error);
    return null;
  }
};
