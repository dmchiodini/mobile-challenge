import { db } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { FavoriteWord } from "../@types/word";

export const saveWordInHistory = async (word: string): Promise<void> => {
  try {
    await addDoc(collection(db, "history"), {
      word,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const saveWordInFavorites = async (word: string): Promise<void> => {
  try {
    await addDoc(collection(db, "favorites"), {
      word,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getWordHistory = async (): Promise<string[] | undefined> => {
  try {
    const historyRef = collection(db, "history");

    let wordHistory: string[] = [];

    const response = await getDocs(historyRef);

    response.forEach((item) => {
      wordHistory.push(item.data().word);
    });

    return wordHistory;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getFavoriteWords = async (): Promise<
  FavoriteWord[] | undefined
> => {
  try {
    const favoriteRef = collection(db, "favorites");
    let favoriteWords: FavoriteWord[] = [];

    const response = await getDocs(favoriteRef);

    response.forEach((item) => {
      favoriteWords.push({
        id: item.id,
        word: item.data().word,
      });
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
