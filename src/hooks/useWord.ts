import { useQuery } from "@tanstack/react-query";
import { getWord } from "../services/api";

export const useWord = (word: string) =>
  useQuery({
    queryKey: [word],
    queryFn: () => getWord(word),
  });
