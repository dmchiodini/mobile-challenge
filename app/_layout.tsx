import { Stack } from "expo-router";
import { AuthProvider } from "../src/contexts/AuthContext";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../src/utils/queryClient";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="/auth/login" />
          <Stack.Screen name="/auth/signup" />
        </Stack>
        <Toast topOffset={80} />
        <StatusBar style="auto" />
      </AuthProvider>
    </QueryClientProvider>
  );
}
