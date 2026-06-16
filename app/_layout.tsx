import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";
import "../global.css";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoading>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#000" />
        </View>
      </ClerkLoading>

      <ClerkLoaded>
        <Slot />
        <Toast />
      </ClerkLoaded>
    </ClerkProvider>
  );
}