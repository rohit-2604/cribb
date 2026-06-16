import { useAuth, useSignUp } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

export default function SignUpScreen() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = fetchStatus === "fetching";
  if (signUp.status === "complete" && isSignedIn) {
    return null;
  }

  const onSignUpPress = async () => {
    const { error } = await signUp.password({
      emailAddress: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
    if (error) {
      Toast.show({
        type: "error",
        text1: "Sign Up Failed",
        text2: error.message,
      });
      return;
    }

    if (!error) await signUp.verifications.sendEmailCode();
  };

const onVerifyPress = async () => {
  const { error } = await signUp.verifications.verifyEmailCode({
    code,
  });

  if (error) {
    Toast.show({
      type: "error",
      text1: error.message,
    });
    return;
  }

  if (signUp.status === "complete") {
    await signUp.finalize({
      navigate: ({ decorateUrl }) => {
        router.replace("/(root)/(tabs)");
      },
    });
  }
};

  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    return (
      <View className="flex-1 justify-center px-6 py-12">
        <Image
          source={require("../../assets/images/kribb.png")}
          className="w-32 h-16 mb-8"
          resizeMode="contain"
        />

        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Verify Your Account
        </Text>

        <Text className="text-gray-500 mb-8">
          We emailed you the six digit code to {email}
        </Text>

        {/* First + Last Name */}

        <TextInput
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
          placeholder="Enter 6 digit code"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
        />
        {errors.fields.code && (
          <Text className="text-red-500 mb-4">
            {errors.fields.code.message}
          </Text>
        )}

        <TouchableOpacity
          disabled={isLoading}
          onPress={onVerifyPress}
          className="w-full bg-blue-600 py-4 rounded-xl items-center mb-4"
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="large" />
          ) : (
            <Text className="text-white font-bold text-base">Verify Code</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => signUp.verifications.sendEmailCode()}
          className="py-2"
        >
          <Text className="text-blue-600 font-bold">
            I didn't receive a code
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      className="bg-white"
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={20} // 👈 important for iOS spacing
      keyboardOpeningTime={0} // 👈 smoother iOS animation
    >
      <View className="flex-1 justify-center px-6 py-12">
        <Image
          source={require("../../assets/images/kribb.png")}
          className="w-32 h-16 mb-8"
          resizeMode="contain"
        />

        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Create Account
        </Text>

        <Text className="text-gray-500 mb-8">Find Your Dream Home Today</Text>

        {/* First + Last Name */}
        <View className="flex-row gap-3 mb-4">
          <TextInput
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3"
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />

          <TextInput
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3"
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />
        </View>

        {/* Email */}
        <TextInput
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {errors?.fields?.emailAddress && (
          <Text className="text-red-500 mb-4">
            {errors.fields.emailAddress.message}
          </Text>
        )}

        {/* Password */}
        <View className="w-full border border-gray-300 rounded-xl mb-4 flex-row items-center px-4">
          <TextInput
            className="flex-1 py-3"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#6B7280"
            />
          </TouchableOpacity>
        </View>

        {errors?.fields?.password && (
          <Text className="text-red-500 mb-4">
            {errors.fields.password.message}
          </Text>
        )}

        {/* Button */}
        <TouchableOpacity
          disabled={isLoading}
          onPress={onSignUpPress}
          className="w-full bg-blue-600 py-4 rounded-xl items-center mb-4"
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="large" />
          ) : (
            <Text className="text-white font-bold text-base">Sign Up</Text>
          )}
        </TouchableOpacity>

        {/* Login link */}
        <View className="flex-row justify-center">
          <Text className="text-gray-500">Already have an account? </Text>
          <Link href="/(auth)/sign-in" className="text-blue-600 font-bold">
            Sign In
          </Link>
        </View>

        <View nativeID="clerk-captcha" />
      </View>
    </KeyboardAwareScrollView>
  );
}
