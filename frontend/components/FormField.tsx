import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { ComponentProps, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type MCIconType = ComponentProps<typeof MaterialCommunityIcons>["name"];
type InputType = "text" | "email" | "password";

const iconMapping: Record<InputType, Record<string, MCIconType>> = {
  text: {
    icon: "account-outline",
  },
  email: {
    icon: "email-outline",
  },
  password: {
    icon: "lock-outline",
  },
};

interface InputFieldProps extends TextInputProps {
  type?: InputType;
  title?: string;
  error?: string;
  otherStyles?: string;
  renderLeftIcon?: boolean;
}

const FormField = ({
  type = "text",
  title,
  error,
  otherStyles,
  renderLeftIcon = true,
  ...props
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const iconName = iconMapping[type].icon;

  return (
    <View className={`w-full mb-4 ${otherStyles}`}>
      <Text
        className={`text-base text-black-200 ${error ? "text-danger" : ""} font-rubik mb-2`}
      >
        {title}
      </Text>
      <View
        className={`border border-gray-300 ${isFocused ? "border-primary-300" : ""} ${error ? "border-red-400" : ""} rounded-lg px-4 flex-row items-center gap-2`}
      >
        {renderLeftIcon && (
          <MaterialCommunityIcons name={iconName} size={20} color="#8C8E98" />
        )}
        <TextInput
          className="flex-1 py-4 text-black-300 font-rubik"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={type === "email" ? "email-address" : "default"}
          secureTextEntry={type === "password" && !isPasswordVisible}
          returnKeyType={type === "password" ? "done" : "next"}
          placeholderTextColor="#8C8E98"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType={type === "email" ? "emailAddress" : "none"}
          {...props}
        />
        {type === "password" ? (
          <MaterialCommunityIcons
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={20}
            color="#8C8E98"
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        ) : null}
      </View>
      {error && (
        <Text className="text-base text-danger font-rubik mt-1">{error}</Text>
      )}
    </View>
  );
};

export default FormField;
