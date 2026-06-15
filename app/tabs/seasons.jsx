import React from "react";
import { ScrollView, View, Text } from "react-native";
import { api } from "../../services/mockData";
import { useFetch } from "../../hooks/useFetch";
import { Loader, ErrorBox, GradientCard, Badge, SectionTitle } from "../../components/ui";

export default function SeasonsScreen() {
  const { data, loading, error, refetch } = useFetch(() => api.getSeasons(), []);

  if (loading) return <Loader message="Cargando temporadas..." />;
  if (error) return <ErrorBox message={error} onRetry={refetch} />;

  return (
    <ScrollView className="flex-1 bg-st-dark px-4 py-4">
      <SectionTitle text="Temporadas" />

      {data?.map((item) => (
        <GradientCard key={item.id} style={{ marginBottom: 14, padding: 16 }}>
          <View className="gap-2">
            <Text className="text-st-text text-xl font-st-title tracking-widest">
              {item.title}
            </Text>

            <View className="flex-row gap-2">
              <Badge label={`${item.year}`} />
              <Badge label={`${item.episodes} episodios`} color="#D4AF37" />
            </View>

            <Text className="text-st-text font-st-body leading-6 mt-2">
              {item.synopsis}
            </Text>

            <Text className="text-st-muted font-st-mono text-xs mt-2">
              Enemigo principal: {item.mainEnemy}
            </Text>

            <Text className="text-st-gold font-st-title text-base">
              Rating: {item.rating}/10
            </Text>
          </View>
        </GradientCard>
      ))}
    </ScrollView>
  );
}