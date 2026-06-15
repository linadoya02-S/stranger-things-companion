import { Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function TabIcon({ name, focused, label }) {
  return (
    <View style={styles.tabItem}>
      <Ionicons
        name={name}
        size={23}
        color={focused ? "#C1121F" : "#7B7B9A"}
      />
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={[styles.tabLabel, focused && styles.tabLabelActive]}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#0A0A0F" },
        headerTintColor: "#E8E8F0",
        headerTitleStyle: {
        fontFamily: "BentonSans-Bold",
        fontSize: 14,
        letterSpacing: 1,
      },
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "INICIO",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "home" : "home-outline"}
              focused={focused}
              label="Inicio"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="characters"
        options={{
          title: "PERSONAJES",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "people" : "people-outline"}
              focused={focused}
              label="Personajes"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="creatures"
        options={{
          title: "CRIATURAS",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "skull" : "skull-outline"}
              focused={focused}
              label="Criaturas"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="locations"
        options={{
          title: "LUGARES",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "map" : "map-outline"}
              focused={focused}
              label="Lugares"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="seasons"
        options={{
          title: "TEMPORADAS",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "film" : "film-outline"}
              focused={focused}
              label="Temporadas"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "FAVORITOS",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "heart" : "heart-outline"}
              focused={focused}
              label="Favoritos"
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#0A0A0F",
    borderTopColor: "#2A2A3F",
    borderTopWidth: 1,
    height: 86,
    paddingTop: 8,
    paddingBottom: 18,
  },
  tabItem: {
    width: 68,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tabLabel: {
    width: 68,
    fontSize: 9,
    fontFamily: "ShareTechMono-Regular",
    color: "#7B7B9A",
    textAlign: "center",
    letterSpacing: 0,
  },
  tabLabelActive: {
    color: "#C1121F",
  },
});