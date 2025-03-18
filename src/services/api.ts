import axios from "axios";
import { WordDetails } from "../@types/wordDetails";

const api = axios.create({
  baseURL: "https://api.dictionaryapi.dev/api/v2/",
});

export const getWord = async (
  word: string
): Promise<WordDetails | undefined> => {
  try {
    const response = await api.get(`entries/en/${word}`);

    const details = response.data[0];

    const wordDetails = {
      word: details.word,
      text: details.phonetics[1].text,
      audio: details.phonetics[1].audio,
      synonyms: details.meanings[0].synonyms,
      meanings: details.meanings[0].definitions[0].definition,
    };

    return wordDetails;
  } catch (error) {
    console.log("Error: ", error);
  }
};
