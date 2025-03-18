import { Stack } from "expo-router";
import { AuthProvider } from "../src/contexts/AuthContext";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="/auth/login" />
        <Stack.Screen name="/auth/signup" />
      </Stack>
      <Toast />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
