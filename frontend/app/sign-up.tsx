import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Link } from "expo-router";
import { useRegister } from "@/hooks/useAuth";
import FormField from "@/components/FormField";
import HScrollView from "@/components/ui/scroll-view";
import { any, z } from "zod";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { mutate: registerUser, isPending: isLoading } = useRegister();

  const registerSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const nameSchema = registerSchema.shape.name;
  const emailSchema = registerSchema.shape.email;
  const passwordSchema = registerSchema.shape.password;

  const handleZodErrors = (err: any) => {
    if (err?.name !== "ZodError") return;

    const newErrors: Record<string, string> = {};

    err.issues.forEach((issue: any) => {
      const field = issue.path[0];
      newErrors[field] = issue.message;
    });

    setFieldErrors((prev) => ({ ...prev, ...newErrors }));
  };

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
        [field]: err?.issues?.[0]?.message || "",
      }));
    }
  };

  const handleRegister = async () => {
    try {
      setError("");
      setFieldErrors({ name: "", email: "", password: "" });

      await registerSchema.parseAsync({ name, email, password });

      registerUser(
        { name, email, password },
        {
          onSuccess: () => {
            Alert.alert("Success", "Account created successfully!");
            router.push("/sign-in");
          },
          onError: (err: any) => {
            const message =
              err?.message || "Registration failed. Please try again.";
            setError(message);
          },
        }
      );
    } catch (err: any) {
      if (err.name === "ZodError") {
        handleZodErrors(err);
      } else {
        const message =
          err?.message || "Registration failed. Please try again.";
        setError(message);
      }
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <HScrollView
          requiresSafeArea={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <Text className="text-base uppercase text-center font-rubik text-black-200">
              Create an account
            </Text>
            <Text className="text-2xl text-center font-rubik font-bold text-primary-300 mt-2">
              Sign up to Real Estate
            </Text>
          </View>

          <View className="mt-8">
            {error && (
              <View className="mb-2">
                <Text className="text-danger text-md font-rubik">{error}</Text>
              </View>
            )}

            <FormField
              title="Full name"
              placeholder="John Doe"
              error={fieldErrors.name}
              onChangeText={(text) => {
                setName(text);
                validateField("name", nameSchema, text);
              }}
            />

            <FormField
              type="email"
              title="Email"
              placeholder="johndoe@gmail.com"
              error={fieldErrors.email}
              onChangeText={(text) => {
                setEmail(text);
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
              onSubmitEditing={handleRegister}
            />
            <TouchableOpacity
              className="bg-blue-500 rounded-lg px-4 py-3 mt-6"
              onPress={handleRegister}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center font-rubik">
                  Create account
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View className="mt-6 flex-row justify-center">
            <Text className="text-base text-center font-rubik text-black-200 ">
              Already have an account?{" "}
              <Link href="/sign-in">
                <Text className="text-primary-300 font-rubik font-medium">
                  Sign In
                </Text>
              </Link>
            </Text>
          </View>
        </HScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
