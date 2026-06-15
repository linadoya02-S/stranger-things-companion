import React from "react";
import { ScrollView, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { api } from "../../services/mockData";
import { useFetch } from "../../hooks/useFetch";
import {
  Loader,
  ErrorBox,
  GradientCard,
  ThreatBadge,
} from "../../components/ui";

export default function CreatureDetailScreen() {
  const { id } = useLocalSearchParams();

  const {
    data,
    loading,
    error,
    refetch,
  } = useFetch(() => api.getCreature(id), [id]);

  if (loading) return <Loader message="Cargando criatura..." />;
  if (error) return <ErrorBox message={error} onRetry={refetch} />;
  if (!data) return <ErrorBox message="Criatura no encontrada" />;

  return (
    <ScrollView className="flex-1 bg-st-dark p-4">
      <GradientCard style={{ padding: 20 }}>
        <Text className="text-st-text text-3xl font-st-title tracking-widest">
          {data.name}
        </Text>

        <View className="mt-4">
          <ThreatBadge level={data.threat} />
        </View>

        <Text className="text-st-muted mt-4 font-st-body">
          Origen: {data.origin}
        </Text>

        <Text className="text-st-text mt-6 leading-7 font-st-body">
          {data.description}
        </Text>

        <Text className="text-st-gold mt-6 font-st-mono">
          Debilidades
        </Text>

        {data.weaknesses?.map((weakness, index) => (
          <Text
            key={index}
            className="text-st-text font-st-body"
          >
            • {weakness}
          </Text>
        ))}

        <Text className="text-st-gold mt-6 font-st-mono">
          Primera aparición
        </Text>

        <Text className="text-st-text font-st-body">
          {data.firstAppearance}
        </Text>
      </GradientCard>
    </ScrollView>
  );
}