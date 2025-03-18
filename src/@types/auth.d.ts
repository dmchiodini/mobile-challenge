export type CreateSession = {
  email: string;
  password: string;
};

export type CreateSessionResponse = {
  id: string;
  email: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  user: CreateSessionResponse | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};
