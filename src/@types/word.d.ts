export type WordDetails = {
  word: string;
  text: string;
  audio: string;
  meanings: Meanings[];
};

type Meanings = {
  partOfSpeech: string;
  definition: string;
  synonyms: string[];
};

export type FavoriteWord = {
  id: string;
  userId: string;
  word: string;
};

export type HistoryWord = {
  userId: string;
  word: string;
};
