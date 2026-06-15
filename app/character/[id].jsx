import React from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import { api } from "../../services/mockData";
import { useFetch } from "../../hooks/useFetch";
import {
  Loader,
  ErrorBox,
  GradientCard,
  Badge,
} from "../../components/ui";

export default function CharacterDetailScreen() {
  const { id } = useLocalSearchParams();

  const {
    data,
    loading,
    error,
    refetch,
  } = useFetch(() => api.getCharacter(id), [id]);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/tabs/favorites");
    }
  };

  if (loading) return <Loader message="Cargando personaje..." />;
  if (error) return <ErrorBox message={error} onRetry={refetch} />;
  if (!data) return <ErrorBox message="Personaje no encontrado" />;

  return (
    <ScrollView className="flex-1 bg-st-dark p-4">
      <Pressable
        onPress={handleBack}
        className="border border-st-border rounded py-3 px-4 mb-4"
      >
        <Text className="text-st-muted font-st-mono tracking-widest">
          ← VOLVER
        </Text>
      </Pressable>

      <GradientCard style={{ padding: 20 }}>
        <Text className="text-st-text text-3xl font-st-title tracking-widest">
          {data.name}
        </Text>

        <Text className="text-st-muted mt-2 font-st-body">
          Nombre real: {data.realName}
        </Text>

        <Text className="text-st-muted font-st-body">
          Actor: {data.actor}
        </Text>

        <View className="mt-4">
          <Badge label={data.status} />
        </View>

        <Text className="text-st-text mt-6 leading-7 font-st-body">
          {data.description}
        </Text>

        {data.affiliation && (
          <>
            <Text className="text-st-gold mt-6 font-st-mono">
              Afiliación
            </Text>

            <Text className="text-st-text font-st-body">
              {data.affiliation}
            </Text>
          </>
        )}

        {data.powers?.length > 0 && (
          <>
            <Text className="text-st-gold mt-6 font-st-mono">
              Poderes
            </Text>

            {data.powers.map((power, index) => (
              <Text
                key={index}
                className="text-st-text font-st-body"
              >
                • {power}
              </Text>
            ))}
          </>
        )}
      </GradientCard>

      <View className="h-10" />
    </ScrollView>
  );
}