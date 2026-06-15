import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { api } from "../../api/mockData";
import { useFetch } from "../../hooks/useFetch";
import { Loader, ErrorBox, SectionTitle } from "../../components/ui";

const QUICK_LINKS = [
  { label: "Personajes", icon: "👥", route: "/characters" },
  { label: "Criaturas", icon: "👾", route: "/creatures" },
  { label: "Lugares", icon: "🗺️", route: "/locations" },
  { label: "Temporadas", icon: "🎬", route: "/seasons" },
];

const FACTS = [
  "La serie está ambientada en Hawkins, Indiana en los años 80.",
  "El Mundo del Revés es una dimensión paralela oscura y desolada.",
  "Eleven fue criada en el Laboratorio Nacional de Hawkins.",
  "El número 11 (Eleven) fue tatuado en el antebrazo de Jane.",
  'Kate Bush experimentó un resurgimiento de popularidad por la T4.',
];

export default function HomeTab() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const { data: seasons } = useFetch(() => api.getSeasons());

  const handleSearch = async () => {
    if (!query.trim()) return;
    await Haptics.selectionAsync();
    setSearching(true);
    const results = await api.searchAll(query);
    setSearchResults(results);
    setSearching(false);
  };

  const clearSearch = () => {
    setQuery("");
    setSearchResults(null);
  };

  const navigate = async (route) => {
    await Haptics.selectionAsync();
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Cabecera */}
        <View style={styles.header}>
          <Text style={styles.headerSub}>ARCHIVO HAWKINS · {new Date().getFullYear()}</Text>
          <Text style={styles.headerTitle}>STRANGER{"\n"}THINGS</Text>
          <Text style={styles.headerCompanion}>COMPANION APP</Text>
        </View>

        {/* Buscador */}
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar personajes, criaturas..."
            placeholderTextColor="#2A2A3F"
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <Pressable
            style={styles.searchBtn}
            onPress={query ? handleSearch : undefined}
          >
            <Text style={styles.searchBtnText}>{searching ? "..." : "🔍"}</Text>
          </Pressable>
        </View>

        {/* Resultados de búsqueda */}
        {searchResults && (
          <View style={styles.section}>
            <View style={styles.searchResultsHeader}>
              <Text style={styles.sectionTitle}>RESULTADOS</Text>
              <Pressable onPress={clearSearch}>
                <Text style={styles.clearText}>✕ Limpiar</Text>
              </Pressable>
            </View>
            {searchResults.characters.length === 0 &&
            searchResults.creatures.length === 0 &&
            searchResults.locations.length === 0 ? (
              <Text style={styles.noResults}>Sin resultados para "{query}"</Text>
            ) : (
              <>
                {searchResults.characters.map((c) => (
                  <Pressable
                    key={`char-${c.id}`}
                    style={styles.resultItem}
                    onPress={() => navigate(`/character/${c.id}`)}
                  >
                    <Text style={styles.resultType}>PERSONAJE</Text>
                    <Text style={styles.resultName}>{c.name}</Text>
                  </Pressable>
                ))}
                {searchResults.creatures.map((c) => (
                  <Pressable
                    key={`cre-${c.id}`}
                    style={styles.resultItem}
                    onPress={() => navigate(`/creature/${c.id}`)}
                  >
                    <Text style={styles.resultType}>CRIATURA</Text>
                    <Text style={styles.resultName}>{c.name}</Text>
                  </Pressable>
                ))}
                {searchResults.locations.map((l) => (
                  <View key={`loc-${l.id}`} style={styles.resultItem}>
                    <Text style={styles.resultType}>LUGAR</Text>
                    <Text style={styles.resultName}>{l.name}</Text>
                  </View>
                ))}
              </>
            )}
          </View>
        )}

        {/* Accesos rápidos */}
        <SectionTitle text="EXPLORAR" />
        <View style={styles.quickLinks}>
          {QUICK_LINKS.map((link) => (
            <Pressable
              key={link.route}
              style={({ pressed }) => [
                styles.quickCard,
                pressed && styles.quickCardPressed,
              ]}
              onPress={() => navigate(link.route)}
            >
              <Text style={styles.quickIcon}>{link.icon}</Text>
              <Text style={styles.quickLabel}>{link.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Temporadas recientes */}
        {seasons && (
          <>
            <SectionTitle text="TEMPORADAS" />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.seasonsRow}
            >
              {seasons.map((s) => (
                <View key={s.id} style={styles.seasonCard}>
                  <Text style={styles.seasonYear}>{s.year}</Text>
                  <Text style={styles.seasonTitle}>{s.title.toUpperCase()}</Text>
                  <Text style={styles.seasonEnemy}>vs. {s.mainEnemy}</Text>
                  <Text style={styles.seasonEpisodes}>{s.episodes} eps · ⭐ {s.rating}</Text>
                </View>
              ))}
            </ScrollView>
          </>
        )}

        {/* Datos curiosos */}
        <SectionTitle text="DATO CLASIFICADO" />
        <View style={styles.factBox}>
          <Text style={styles.factText}>
            {FACTS[Math.floor(Math.random() * FACTS.length)]}
          </Text>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0A0A0F" },
  scroll: { flex: 1 },
  header: {
    padding: 24,
    paddingTop: 16,
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A3F",
  },
  headerSub: {
    fontFamily: "ShareTechMono-Regular",
    fontSize: 10,
    color: "#C1121F",
    letterSpacing: 2,
  },
  headerTitle: {
    fontFamily: "BentonSans-Bold",
    fontSize: 40,
    color: "#E8E8F0",
    letterSpacing: 6,
    lineHeight: 44,
  },
  headerCompanion: {
    fontFamily: "ShareTechMono-Regular",
    fontSize: 12,
    color: "#7B7B9A",
    letterSpacing: 4,
  },
  searchRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#12121A",
    borderWidth: 1,
    borderColor: "#2A2A3F",
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 11,
    color: "#E8E8F0",
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
  },
  searchBtn: {
    backgroundColor: "#12121A",
    borderWidth: 1,
    borderColor: "#2A2A3F",
    borderRadius: 4,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  searchBtnText: { fontSize: 18 },
  section: { paddingHorizontal: 16 },
  searchResultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: "ShareTechMono-Regular",
    fontSize: 11,
    color: "#7B7B9A",
    letterSpacing: 2,
  },
  clearText: {
    fontFamily: "ShareTechMono-Regular",
    fontSize: 11,
    color: "#C1121F",
  },
  noResults: {
    fontFamily: "Montserrat-Regular",
    fontSize: 13,
    color: "#7B7B9A",
    textAlign: "center",
    padding: 16,
  },
  resultItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#12121A",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#2A2A3F",
    marginBottom: 6,
    gap: 2,
  },
  resultType: {
    fontFamily: "ShareTechMono-Regular",
    fontSize: 9,
    color: "#C1121F",
    letterSpacing: 2,
  },
  resultName: {
    fontFamily: "BentonSans-Bold",
    fontSize: 15,
    color: "#E8E8F0",
  },
  quickLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 10,
  },
  quickCard: {
    width: "47%",
    backgroundColor: "#12121A",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2A2A3F",
    padding: 20,
    alignItems: "center",
    gap: 8,
  },
  quickCardPressed: { backgroundColor: "#1A1A27", borderColor: "#C1121F" },
  quickIcon: { fontSize: 28 },
  quickLabel: {
    fontFamily: "BentonSans-Bold",
    fontSize: 12,
    color: "#E8E8F0",
    letterSpacing: 2,
  },
  seasonsRow: { paddingHorizontal: 16, gap: 12 },
  seasonCard: {
    width: 160,
    backgroundColor: "#12121A",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2A2A3F",
    padding: 16,
    gap: 4,
  },
  seasonYear: {
    fontFamily: "ShareTechMono-Regular",
    fontSize: 10,
    color: "#C1121F",
    letterSpacing: 2,
  },
  seasonTitle: {
    fontFamily: "BentonSans-Bold",
    fontSize: 13,
    color: "#E8E8F0",
    letterSpacing: 1,
  },
  seasonEnemy: {
    fontFamily: "Montserrat-Regular",
    fontSize: 11,
    color: "#7B7B9A",
  },
  seasonEpisodes: {
    fontFamily: "ShareTechMono-Regular",
    fontSize: 10,
    color: "#D4AF37",
    marginTop: 4,
  },
  factBox: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: "#12121A",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#C1121F33",
    borderLeftWidth: 3,
    borderLeftColor: "#C1121F",
  },
  factText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 13,
    color: "#E8E8F0",
    lineHeight: 20,
    fontStyle: "italic",
  },
});
