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

type FavoriteWord = {
  id: string;
  word: string;
};
