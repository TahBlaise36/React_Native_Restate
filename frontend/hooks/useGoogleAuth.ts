// src/hooks/useGoogleAuth.ts
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "../api/axiosClient";
import * as SecureStore from "expo-secure-store";

const CLIENT_ID = (process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID ?? "").trim();

type BackendResponse = {
  // adapt to your backend response shape
  token?: string;
  data?: { token?: string };
  user?: any;
};

export const useGoogleAuth = () => {
  // create an auth request (must be called inside a hook/component)
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: CLIENT_ID,
    scopes: ["openid", "profile", "email"],
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true } as any),
    // request id_token so server can verify via google-auth-library
    responseType: "id_token",
  });

  // optional: you can handle `response` here if you prefer (not required)
  useEffect(() => {
    // You can inspect `response` here if needed
  }, [response]);

  const mutation = useMutation<BackendResponse, Error, void>(async () => {
    if (!request) throw new Error("Auth request is not ready");

    // promptAsync opens the browser/auth flow
    const result = await promptAsync({ useProxy: true } as any);

    if (result.type !== "success") {
      throw new Error("Google sign-in canceled or failed");
    }

    // Try to get the id_token (preferred) — provider sets it in params if responseType=id_token
    const idToken =
      result.params?.id_token ??
      result.authentication?.idToken ??
      result.authentication?.accessToken;

    if (!idToken) {
      throw new Error("No ID token returned by Google");
    }

    // Send the idToken to your backend, which should verify the id token server-side
    // Note: backend should expect { idToken } (or adjust the key accordingly)
    const res = await axiosClient.post<BackendResponse>("/auth/google", {
      tokenId: idToken,
    });

    // backend token could be in res.data.token OR res.data.data.token depending on your API shape
    const token =
      (res?.data as any)?.data?.token ??
      (res?.data as any)?.token ??
      (res?.data as any);

    // persist token if available
    if (typeof token === "string" && token.length > 0) {
      await SecureStore.setItemAsync("token", token);
    }

    return res.data;
  });

  return {
    ...mutation, // contains mutate, mutateAsync, isLoading, isError, error, etc.
    request,
    promptAsync,
  };
};
