import React from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { api } from "../../services/mockData";
import { useFetch } from "../../hooks/useFetch";
import { useAuth } from "../../hooks/useAuth";
import { Loader, ErrorBox, GradientCard, Badge, SectionTitle } from "../../components/ui";

export default function FavoritesScreen() {
  const { isLoggedIn, user, logout } = useAuth();
  const { data, loading, error, refetch } = useFetch(() => api.getCharacters(), []);

  const handleLogin = async () => {
    await Haptics.selectionAsync();
    router.push("/login");
  };

  const handleLogout = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    logout();
  };

  if (!isLoggedIn) {
    return (
      <View className="flex-1 bg-st-dark items-center justify-center px-6">
        <Text className="text-st-red text-2xl font-st-title tracking-widest text-center">
          ACCESO RESTRINGIDO
        </Text>

        <Text className="text-st-muted font-st-body text-center mt-4 leading-6">
          Para ingresar a la zona clasificada debes iniciar sesión.
        </Text>

        <Pressable
          onPress={handleLogin}
          className="bg-st-red px-6 py-4 rounded mt-8"
        >
          <Text className="text-st-text font-st-title tracking-widest">
            IR A LOGIN
          </Text>
        </Pressable>
      </View>
    );
  }

  if (loading) return <Loader message="Cargando favoritos..." />;
  if (error) return <ErrorBox message={error} onRetry={refetch} />;

  const favorites = data?.filter((item) => item.id <= 3);

  return (
    <ScrollView className="flex-1 bg-st-dark px-4 py-4">
      <SectionTitle text="Zona Clasificada" />

      <Text className="text-st-muted font-st-body mb-4">
        Usuario activo: {user?.username}
      </Text>

      {favorites?.map((item) => (
        <GradientCard key={item.id} style={{ marginBottom: 14, padding: 16 }}>
          <View className="gap-2">
            <Text className="text-st-text text-xl font-st-title tracking-widest">
              {item.name}
            </Text>

            <Badge label="Favorito" color="#D4AF37" />

            <Text className="text-st-text font-st-body leading-6 mt-2">
              {item.description}
            </Text>
          </View>
        </GradientCard>
      ))}

      <Pressable
        onPress={handleLogout}
        className="border border-st-border rounded py-4 items-center mt-4 mb-8"
      >
        <Text className="text-st-muted font-st-mono tracking-widest">
          CERRAR SESIÓN
        </Text>
      </Pressable>
    </ScrollView>
  );
}