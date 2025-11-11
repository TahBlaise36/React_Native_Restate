import React, { useEffect, useState, useContext, createContext } from "react";
import * as SecureStore from "expo-secure-store";

type AuthContextType = {
  user: { token: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ token: string } | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ token: string } | null>(null);

  useEffect(() => {
    // Check for existing token in secure storage and validate it
    const loadUser = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        // Optionally, validate token with backend
        setUser({ token }); // Set user state if token is valid
      }
    };
    loadUser();
  }, []);

  return React.createElement(
    AuthContext.Provider,
    { value: { user, setUser } },
    children
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
