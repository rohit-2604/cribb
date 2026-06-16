import { Redirect } from "expo-router";
import { useAuth } from "@clerk/expo";

export default function Index() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)" />;
  }
  return <Redirect href="/(auth)/sign-up" />;
}
