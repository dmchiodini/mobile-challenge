import { useQuery } from "@tanstack/react-query";
import { getWord } from "../services/api";

export const useWord = (word: string, userId: string) =>
  useQuery({
    queryKey: [word, userId],
    queryFn: () => getWord(word, userId),
  });
