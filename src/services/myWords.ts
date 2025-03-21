import { db } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { FavoriteWord, HistoryWord } from "../@types/word";

export const saveWordInHistory = async (
  word: string,
  userId: string
): Promise<void> => {
  try {
    await addDoc(collection(db, "history"), {
      word,
      userId,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const saveWordInFavorites = async (
  word: string,
  userId: string
): Promise<void> => {
  try {
    await addDoc(collection(db, "favorites"), {
      word,
      userId,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getWordHistory = async (
  useId: string
): Promise<string[] | undefined> => {
  try {
    const historyRef = collection(db, "history");

    let wordHistory: string[] = [];

    const response = await getDocs(historyRef);

    response.forEach((item) => {
      if (item.data().userId === useId) {
        wordHistory.push(item.data().word);
      }
    });

    return wordHistory;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getFavoriteWords = async (
  useId: string
): Promise<FavoriteWord[] | undefined> => {
  try {
    const favoriteRef = collection(db, "favorites");
    let favoriteWords: FavoriteWord[] = [];

    const response = await getDocs(favoriteRef);

    response.forEach((item) => {
      if (item.data().useId === useId) {
        favoriteWords.push({
          id: item.id,
          word: item.data().word,
          userId: item.data().userId,
        });
      }
    });

    return favoriteWords;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const removeFavoriteWord = async (id: string): Promise<void> => {
  try {
    const favoriteRef = doc(db, "favorites", id);
    await deleteDoc(favoriteRef);
  } catch (error) {
    console.log("Error: ", error);
  }
};
