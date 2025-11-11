import { useMutation } from "@tanstack/react-query";
import axiosClient from "../api/axiosClient";
import * as SecureStore from "expo-secure-store";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (credentials: {
      name: string;
      email: string;
      password: string;
    }) => {
      const { data } = await axiosClient.post("/auth/register", credentials);
      // store token
      await SecureStore.setItemAsync("token", data.data.token);
      return data;
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { data } = await axiosClient.post("/auth/login", credentials);
      await SecureStore.setItemAsync("token", data.data.token);
      return data;
    },
  });
};
