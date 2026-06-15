import React from "react";
import { ScrollView, View, Text, Pressable, Image } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import { api } from "../../services/mockData";
import { useFetch } from "../../hooks/useFetch";
import {
  Loader,
  ErrorBox,
  GradientCard,
  ThreatBadge,
} from "../../components/ui";

const CREATURE_IMAGES = {
  1: require("../../assets/creatures/demogorgon.png"),
  2: require("../../assets/creatures/mindflayer.png"),
  3: require("../../assets/creatures/demodogs.png"),
  4: require("../../assets/creatures/vecna.png"),
};

export default function CreatureDetailScreen() {
  const { id } = useLocalSearchParams();

  const {
    data,
    loading,
    error,
    refetch,
  } = useFetch(() => api.getCreature(id), [id]);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/tabs/creatures");
    }
  };

  if (loading) return <Loader message="Cargando criatura..." />;
  if (error) return <ErrorBox message={error} onRetry={refetch} />;
  if (!data) return <ErrorBox message="Criatura no encontrada" />;

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
        <View className="w-full h-72 rounded-lg overflow-hidden border border-st-border bg-st-darker mb-5">
          <Image
            source={CREATURE_IMAGES[Number(id)]}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

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

      <View className="h-10" />
    </ScrollView>
  );
}