import { Stack } from "expo-router";
import { AuthProvider } from "../src/contexts/AuthContext";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="/auth/login" />
        <Stack.Screen name="/auth/signup" />
      </Stack>
      <Toast />
    </AuthProvider>
  );
}
