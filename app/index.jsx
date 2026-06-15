import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function LandingScreen() {
  // Animaciones de entrada
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const btnOpacity = useRef(new Animated.Value(0)).current;
  const flickerOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Efecto de parpadeo tipo televisor en el logo
    const flicker = () => {
      Animated.sequence([
        Animated.timing(flickerOpacity, { toValue: 0.3, duration: 80, useNativeDriver: true }),
        Animated.timing(flickerOpacity, { toValue: 1, duration: 60, useNativeDriver: true }),
        Animated.timing(flickerOpacity, { toValue: 0.7, duration: 50, useNativeDriver: true }),
        Animated.timing(flickerOpacity, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start();
    };

    // Secuencia de entrada orquestada
    Animated.sequence([
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1, friction: 5, useNativeDriver: true }),
      ]),
      Animated.timing(subtitleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.delay(200),
      Animated.timing(btnOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start(() => {
      // Parpadear el logo tras cargarse
      setTimeout(flicker, 1500);
    });
  }, []);

  const handleEnter = async () => {
    // Retroalimentación háptica al pulsar el botón principal
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    router.replace("app/tabs");
  };

  const handleLogin = async () => {
    await Haptics.selectionAsync();
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      {/* Fondo con gradiente oscuro */}
      <LinearGradient
        colors={["#050508", "#0A0A0F", "#12121A"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Líneas de escaneo decorativas */}
      {Array.from({ length: 20 }).map((_, i) => (
        <View
          key={i}
          style={[styles.scanLine, { top: (height / 20) * i }]}
        />
      ))}

      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo principal con efecto flickering */}
          <Animated.View
            style={[
              styles.logoContainer,
              { opacity: logoOpacity, transform: [{ scale: logoScale }] },
            ]}
          >
            <Animated.View style={{ opacity: flickerOpacity }}>
              {/* Título estilo logo Stranger Things */}
              <Text style={styles.logoLine1}>STRANGER</Text>
              <Text style={styles.logoLine2}>THINGS</Text>
            </Animated.View>
            <Text style={styles.logoSub}>C O M P A N I O N</Text>
            <View style={styles.logoDivider} />
          </Animated.View>

          {/* Descripción */}
          <Animated.View style={[styles.descContainer, { opacity: subtitleOpacity }]}>
            <Text style={styles.classification}>
              — ARCHIVO CLASIFICADO —{"\n"}HAWKINS LAB · 1983
            </Text>
            <Text style={styles.desc}>
              Accede a la base de datos completa del universo de Stranger Things.
              Personajes, criaturas, localizaciones y temporadas.
            </Text>
          </Animated.View>

          {/* Botones de acción */}
          <Animated.View style={[styles.btnContainer, { opacity: btnOpacity }]}>
            <Pressable
              style={({ pressed }) => [
                styles.btnPrimary,
                pressed && styles.btnPressed,
              ]}
              onPress={handleEnter}
            >
              <LinearGradient
                colors={["#C1121F", "#6B0F1A"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.btnGradient}
              >
                <Text style={styles.btnPrimaryText}>▶ ACCEDER AL ARCHIVO</Text>
              </LinearGradient>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.btnSecondary,
                pressed && styles.btnPressed,
              ]}
              onPress={handleLogin}
            >
              <Text style={styles.btnSecondaryText}>ZONA CLASIFICADA →</Text>
            </Pressable>
          </Animated.View>

          {/* Footer */}
          <Text style={styles.footer}>
            HAWKINS NATIONAL LABORATORY{"\n"}DEPARTAMENTO DE ENERGIA · EE.UU.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050508" },
  safe: { flex: 1 },
  content: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 48,
    gap: 32,
  },
  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  logoContainer: { alignItems: "center", gap: 4 },
  logoLine1: {
    fontFamily: "BentonSans-Bold",
    fontSize: 52,
    color: "#C1121F",
    letterSpacing: 12,
    textShadowColor: "#C1121F",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  logoLine2: {
    fontFamily: "BentonSans-Bold",
    fontSize: 52,
    color: "#E8E8F0",
    letterSpacing: 12,
    marginTop: -8,
    textShadowColor: "rgba(255,255,255,0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  logoSub: {
    fontFamily: "ShareTechMono-Regular",
    fontSize: 13,
    color: "#7B7B9A",
    letterSpacing: 8,
    marginTop: 12,
  },
  logoDivider: {
    width: 80,
    height: 1,
    backgroundColor: "#C1121F",
    marginTop: 16,
    opacity: 0.6,
  },
  descContainer: { alignItems: "center", gap: 16, maxWidth: 300 },
  classification: {
    fontFamily: "ShareTechMono-Regular",
    fontSize: 10,
    color: "#C1121F",
    textAlign: "center",
    letterSpacing: 2,
    opacity: 0.8,
  },
  desc: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    color: "#7B7B9A",
    textAlign: "center",
    lineHeight: 22,
  },
  btnContainer: { width: "100%", gap: 12 },
  btnPrimary: { borderRadius: 4, overflow: "hidden" },
  btnGradient: { paddingVertical: 16, alignItems: "center" },
  btnPrimaryText: {
    fontFamily: "BentonSans-Bold",
    fontSize: 14,
    color: "#E8E8F0",
    letterSpacing: 3,
  },
  btnSecondary: {
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2A3F",
    borderRadius: 4,
  },
  btnSecondaryText: {
    fontFamily: "ShareTechMono-Regular",
    fontSize: 12,
    color: "#7B7B9A",
    letterSpacing: 2,
  },
  btnPressed: { opacity: 0.7 },
  footer: {
    fontFamily: "ShareTechMono-Regular",
    fontSize: 9,
    color: "#2A2A3F",
    textAlign: "center",
    letterSpacing: 1,
    lineHeight: 16,
  },
});
