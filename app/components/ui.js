import React from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// ── Loader ─────────────────────────────────────────────────────
export function Loader({ message = "Cargando..." }) {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#C1121F" />
      <Text style={styles.loaderText}>{message}</Text>
    </View>
  );
}

// ── ErrorBox ───────────────────────────────────────────────────
export function ErrorBox({ message, onRetry }) {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorIcon}>⚠</Text>
      <Text style={styles.errorText}>{message}</Text>
      {onRetry && (
        <Pressable style={styles.retryBtn} onPress={onRetry}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      )}
    </View>
  );
}

// ── Badge ──────────────────────────────────────────────────────
export function Badge({ label, color = "#C1121F" }) {
  return (
    <View style={[styles.badge, { backgroundColor: color + "33", borderColor: color }]}>
      <Text style={[styles.badgeText, { color }]}>{label}</Text>
    </View>
  );
}

// ── SectionTitle ───────────────────────────────────────────────
export function SectionTitle({ text }) {
  return (
    <View style={styles.sectionTitleRow}>
      <View style={styles.sectionTitleLine} />
      <Text style={styles.sectionTitleText}>{text}</Text>
      <View style={styles.sectionTitleLine} />
    </View>
  );
}

// ── GradientCard ───────────────────────────────────────────────
export function GradientCard({ children, style }) {
  return (
    <LinearGradient
      colors={["#1A1A27", "#12121A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradientCard, style]}
    >
      {children}
    </LinearGradient>
  );
}

// ── ThreatBadge ────────────────────────────────────────────────
export function ThreatBadge({ level }) {
  const colors = {
    Extreme: "#C1121F",
    High: "#E85D04",
    Medium: "#D4AF37",
    Low: "#2A9D8F",
  };
  return <Badge label={level} color={colors[level] || "#7B7B9A"} />;
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0A0F",
    gap: 12,
  },
  loaderText: {
    color: "#7B7B9A",
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0A0F",
    padding: 24,
    gap: 12,
  },
  errorIcon: { fontSize: 40 },
  errorText: {
    color: "#E8E8F0",
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    textAlign: "center",
  },
  retryBtn: {
    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: "#C1121F",
    borderRadius: 4,
  },
  retryText: {
    color: "#E8E8F0",
    fontFamily: "Montserrat-Regular",
    fontSize: 13,
    fontWeight: "600",
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: "ShareTechMono-Regular",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    gap: 8,
  },
  sectionTitleLine: { flex: 1, height: 1, backgroundColor: "#2A2A3F" },
  sectionTitleText: {
    color: "#7B7B9A",
    fontSize: 11,
    fontFamily: "ShareTechMono-Regular",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  gradientCard: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2A2A3F",
    overflow: "hidden",
  },
});
