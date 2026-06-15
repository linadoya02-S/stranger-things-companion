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
  SectionTitle,
  ThreatBadge,
} from "../../components/ui";

export default function CreaturesScreen() {
  const { data, loading, error, refetch } = useFetch(
    () => api.getCreatures(),
    []
  );

  const goToDetail = async (id) => {
    await Haptics.selectionAsync();
    router.push(`/creature/${id}`);
  };

  if (loading) return <Loader message="Cargando criaturas..." />;
  if (error) return <ErrorBox message={error} onRetry={refetch} />;

  return (
    <ScrollView className="flex-1 bg-st-dark px-4 py-4">
      <SectionTitle text="Criaturas" />

      {data?.map((item) => (
        <GradientCard key={item.id} style={{ marginBottom: 14, padding: 16 }}>
          <View className="gap-2">
            <Pressable onPress={() => goToDetail(item.id)}>
              <Text className="text-st-text text-xl font-st-title tracking-widest">
                {item.name}
              </Text>

              <Text className="text-st-red font-st-mono text-xs mt-1">
                VER EXPEDIENTE →
              </Text>
            </Pressable>

            <ThreatBadge level={item.threat} />

            <Text className="text-st-muted font-st-body">
              Origen: {item.origin}
            </Text>

            <Text className="text-st-text font-st-body leading-6 mt-2">
              {item.description}
            </Text>

            <Text className="text-st-gold font-st-mono text-xs mt-2">
              Debilidades: {item.weaknesses?.join(", ")}
            </Text>
          </View>
        </GradientCard>
      ))}
    </ScrollView>
  );
}