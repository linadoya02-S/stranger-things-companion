import React from "react";
import { ScrollView, View, Text } from "react-native";
import { api } from "../../services/mockData";
import { useFetch } from "../../hooks/useFetch";
import { Loader, ErrorBox, GradientCard, Badge, SectionTitle } from "../../components/ui";

export default function LocationsScreen() {
  const { data, loading, error, refetch } = useFetch(() => api.getLocations(), []);

  if (loading) return <Loader message="Cargando localizaciones..." />;
  if (error) return <ErrorBox message={error} onRetry={refetch} />;

  return (
    <ScrollView className="flex-1 bg-st-dark px-4 py-4">
      <SectionTitle text="Localizaciones" />

      {data?.map((item) => (
        <GradientCard key={item.id} style={{ marginBottom: 14, padding: 16 }}>
          <View className="gap-2">
            <Text className="text-st-text text-xl font-st-title tracking-widest">
              {item.name}
            </Text>

            <Badge label={item.type} color="#3A86FF" />

            <Text className="text-st-text font-st-body leading-6 mt-2">
              {item.description}
            </Text>

            <Text className="text-st-gold font-st-mono text-xs mt-2">
              Destacado por: {item.notableFor?.join(", ")}
            </Text>
          </View>
        </GradientCard>
      ))}
    </ScrollView>
  );
}