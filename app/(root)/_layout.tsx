import { useAuth } from "@clerk/expo";
import { Redirect, Slot, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const { isSignedIn, isLoaded } = useAuth();


  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <Stack screenOptions={{headerShown: false}} />;
}
