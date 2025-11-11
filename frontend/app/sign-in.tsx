import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Link, useRouter } from "expo-router";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import FormField from "@/components/FormField";
import { useLogin } from "@/hooks/useAuth";
import HScrollView from "@/components/ui/scroll-view";
import { z } from "zod";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const { mutateAsync: loginUserWithGoogle, isPending: isLoading } =
    useGoogleAuth();
  const { mutate: loginUser, isPending: isLoggingIn } = useLogin();

  const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const emailSchema = loginSchema.shape.email;
  const passwordSchema = loginSchema.shape.password;

  const validateField = (
    field: keyof typeof fieldErrors,
    schema: z.ZodTypeAny,
    value: string
  ) => {
    try {
      schema.parse(value);
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (err: any) {
      setFieldErrors((prev) => ({
        ...prev,
        [field]: err?.issues?.[0]?.message,
      }));
    }
  };

  const handleZodErrors = (err: any) => {
    if (err.name !== "ZodError") return;

    const newErrors: Record<string, string> = {};

    err.issues.forEach((issue: any) => {
      const field = issue.path[0];
      newErrors[field] = issue.message;
    });

    setFieldErrors((prev) => ({ ...prev, ...newErrors }));
  };

  const handleLogin = async () => {
    try {
      setError("");
      setFieldErrors({ email: "", password: "" });

      await loginSchema.parseAsync({ email, password });

      loginUser(
        { email, password },
        {
          onSuccess: () => {
            Alert.alert("Success", "Login successfully!");
            router.push("/(root)/(tabs)");
          },
          onError: (err: any) => {
            const message = err?.message;
            setError(message);
          },
        }
      );
    } catch (err: any) {
      // console.log("Login error:", err?.message);

      if (err.name === "ZodError") {
        handleZodErrors(err);
      } else {
        const message = err?.message || "Login failed. Please try again.";
        setError(message);
      }
    }
  };

  const handleLoginWithGoogle = async () => {
    loginUserWithGoogle(undefined, {
      onSuccess: () => {
        Alert.alert("Success", "Login successfully!");
        router.push("/(root)/(tabs)");
      },

      onError: (err: any) => {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Google sign-in failed. Please try again.";
        Alert.alert("Error Message:", message);
      },
    });
  };

  return (
    <SafeAreaView className=" bg-white flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <HScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={images.onboarding}
            className="w-full h-96"
            resizeMode="stretch"
          />
          <View className="">
            <Text className="text-base text-center uppercase font-rubik text-black-200  ">
              Welcome to Real Scout
            </Text>
            <Text className="text-3xl text-center font-rubik font-bold text-black-300 mt-2">
              Let’s Get You Closer to{"\n"}
              <Text className="text-primary-300">Your Ideal Home</Text>
            </Text>
            <Text className="text-lg text-center font-rubik text-black-200 mt-12">
              Login to Real Scout with Google
            </Text>

            <TouchableOpacity
              onPress={handleLoginWithGoogle}
              className=" bg-white shadow-md shadow-zinc-300 rounded-full py-4 mt-5 items-center"
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <View className="flex-row items-center justify-center gap-3">
                  <Image
                    source={icons.google}
                    className="w-6 h-6"
                    resizeMode="contain"
                  />
                  <Text className="text-base text-black-300 font-rubik font-medium">
                    Sign in with Google
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Sign in form */}
            <View className="mt-4">
              {error && (
                <View className="mb-2">
                  <Text className="text-danger">{error}</Text>
                </View>
              )}
              <FormField
                type="email"
                title="Email"
                placeholder="johndoe@gmail.com"
                error={fieldErrors.email}
                onChangeText={(text) => {
                  setPassword(text);
                  validateField("email", emailSchema, text);
                }}
              />
              <FormField
                type="password"
                title="Password"
                placeholder="********"
                error={fieldErrors.password}
                onChangeText={(text) => {
                  setPassword(text);
                  validateField("password", passwordSchema, text);
                }}
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity
                className="bg-blue-500 rounded-lg px-4 py-3 mt-6"
                onPress={handleLogin}
              >
                {isLoggingIn ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white text-center font-rubik font-medium">
                    Login
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <Link href="/sign-up" className="mt-5">
              <Text className="text-base text-center font-rubik text-black-200 ">
                Don’t have an account?{" "}
                <Text className="text-primary-300 font-rubik font-medium">
                  Register
                </Text>
              </Text>
            </Link>
          </View>
        </HScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
