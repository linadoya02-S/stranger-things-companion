import "../global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { AuthProvider } from "../hooks/useAuth";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Cargar dos fuentes descargadas (requisito de la actividad)
  const [fontsLoaded] = useFonts({
    // Fuente 1: BentonSans Bold - estilo retro años 80 similar al logo de ST
    "BentonSans-Bold": require("../assets/fonts/BentonSans-Bold.ttf"),
    // Fuente 2: Montserrat Regular - cuerpo limpio y legible
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    // Fuente 3 (extra): Share Tech Mono - para datos técnicos/etiquetas
    "ShareTechMono-Regular": require("../assets/fonts/Share-TechMono.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <StatusBar style="light" backgroundColor="#0A0A0F" />
      {/* Stack Navigator raíz - Navegación tipo 1 */}
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0A0A0F" },
          headerTintColor: "#E8E8F0",
          headerTitleStyle: {
            fontFamily: "BentonSans-Bold",
            fontSize: 16,
            letterSpacing: 2,
          },
          contentStyle: { backgroundColor: "#0A0A0F" },
          animation: "slide_from_right",
        }}
      >
        {/* Landing (sin header) */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* Login */}
        <Stack.Screen
          name="login"
          options={{ title: "ACCESO CLASIFICADO", headerBackTitle: "" }}
        />
        {/* Tabs app */}
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
        {/* Detalles de personaje */}
        <Stack.Screen
          name="character/[id]"
          options={{ title: "PERSONAJE", headerBackTitle: "" }}
        />
        {/* Detalles de criatura */}
        <Stack.Screen
          name="creature/[id]"
          options={{ title: "CRIATURA", headerBackTitle: "" }}
        />
      </Stack>
    </AuthProvider>
  );
}
