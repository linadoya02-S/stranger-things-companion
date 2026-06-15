import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

export default function LandingScreen() {
  const handleEnter = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    router.replace("/tabs");
  };

  const handleLogin = async () => {
    await Haptics.selectionAsync();
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#050508", "#0A0A0F", "#12121A"]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          
          {/* LOGO PNG */}
          <Image
            source={require("../assets/logo-stranger-things.png")}
            style={styles.logo}
          />

          <Text style={styles.classified}>
            ARCHIVO CLASIFICADO
          </Text>

          <Text style={styles.subTitle}>
            HAWKINS LAB · 1983
          </Text>

          <Text style={styles.description}>
            Accede a la base de datos completa del universo de Stranger Things.
            Explora personajes, criaturas, localizaciones y temporadas.
          </Text>

          <Pressable onPress={handleEnter} style={styles.mainButton}>
            <LinearGradient
              colors={["#C1121F", "#7A0B14"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.mainButtonGradient}
            >
              <View style={styles.buttonContent}>
  <Image
    source={require("../assets/icon-access.png")}
    style={styles.buttonIcon}
  />

  <Text style={styles.mainButtonText}>
    ACCEDER AL ARCHIVO
  </Text>
</View>
            </LinearGradient>
          </Pressable>

          <Pressable onPress={handleLogin}>
            <Text style={styles.secondaryButton}>
              ZONA CLASIFICADA →
            </Text>
          </Pressable>

          <Text style={styles.footer}>
            HAWKINS NATIONAL LABORATORY{"\n"}
            DEPARTAMENTO DE ENERGÍA · EE.UU.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050508",
  },

  safe: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  logo: {
    width: "95%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 30,
  },

  classified: {
    color: "#C1121F",
    fontFamily: "ShareTechMono-Regular",
    fontSize: 14,
    letterSpacing: 3,
    marginBottom: 8,
  },

  subTitle: {
    color: "#7B7B9A",
    fontFamily: "ShareTechMono-Regular",
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 25,
  },

  description: {
    color: "#B8B8C8",
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    lineHeight: 28,
    textAlign: "center",
    marginBottom: 40,
  },

  mainButton: {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
  },

  mainButtonGradient: {
    paddingVertical: 18,
    alignItems: "center",
  },

  mainButtonText: {
    color: "#FFFFFF",
    fontFamily: "BentonSans-Bold",
    fontSize: 16,
    letterSpacing: 3,
  },

  secondaryButton: {
    color: "#7B7B9A",
    fontFamily: "ShareTechMono-Regular",
    fontSize: 13,
    letterSpacing: 2,
    marginBottom: 50,
  },

  footer: {
    color: "#3A3A4A",
    fontFamily: "ShareTechMono-Regular",
    textAlign: "center",
    fontSize: 10,
    letterSpacing: 1.5,
    lineHeight: 18,
  },

  buttonContent: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
},

buttonIcon: {
  width: 36,
  height: 36,
  resizeMode: "contain",
  marginRight: 12,
},
});