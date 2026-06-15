import React from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";

import { api } from "../../services/mockData";
import { useFetch } from "../../hooks/useFetch";
import {
  Loader,
  ErrorBox,
  GradientCard,
  Badge,
  SectionTitle,
} from "../../components/ui";

export default function CharactersScreen() {
  const { data, loading, error, refetch } = useFetch(
    () => api.getCharacters(),
    []
  );

  const goToDetail = async (id) => {
    await Haptics.selectionAsync();
    router.push(`/character/${id}`);
  };

  if (loading) return <Loader message="Cargando personajes..." />;
  if (error) return <ErrorBox message={error} onRetry={refetch} />;

  return (
    <ScrollView className="flex-1 bg-st-dark px-4 py-4">
      <SectionTitle text="Personajes" />

      {data?.map((item) => (
        <GradientCard key={item.id} style={{ marginBottom: 14, padding: 16 }}>
          <View className="gap-2">
            <Pressable onPress={() => goToDetail(item.id)}>
              <Text className="text-st-text text-xl font-st-title tracking-widest">
                {item.name}
              </Text>

              <Text className="text-st-red font-st-mono text-xs mt-1">
                VER FICHA →
              </Text>
            </Pressable>

            <Text className="text-st-muted font-st-body">
              Interpretado por: {item.actor}
            </Text>

            <Badge label={item.status} />

            <Text className="text-st-text font-st-body leading-6 mt-2">
              {item.description}
            </Text>

            {item.powers?.length > 0 && (
              <Text className="text-st-gold font-st-mono text-xs mt-2">
                Poderes: {item.powers.join(", ")}
              </Text>
            )}
          </View>
        </GradientCard>
      ))}
    </ScrollView>
  );
}