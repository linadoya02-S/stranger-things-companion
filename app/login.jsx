import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../hooks/useAuth";

const CHARACTER_IMAGES = [
  require("../assets/characters/eleven.png"),
  require("../assets/characters/mike.png"),
  require("../assets/characters/dustin.png"),
  require("../assets/characters/lucas.png"),
];

export default function LoginScreen() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      Alert.alert("Acceso denegado", "Introduce usuario y contraseña.");
      return;
    }

    setLoading(true);
    try {
      await login(username, password);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace("/tabs/favorites");
    } catch (err) {
      setAttempts((a) => a + 1);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert(
        "ACCESO DENEGADO",
        attempts >= 2
          ? `${err.message}\n\nPista: usuario "admin" / contraseña "hawkins1983"`
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#050508", "#0A0A0F"]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.header}>
              <Text style={styles.headerLabel}>LABORATORIO HAWKINS</Text>
              <Text style={styles.headerTitle}>ZONA CLASIFICADA</Text>
              <Text style={styles.headerSub}>
                Nivel de autorización requerido: ALTO
              </Text>
            </View>

            <View style={styles.charactersRow}>
              {CHARACTER_IMAGES.map((source, index) => (
                <View key={index} style={styles.characterFrame}>
                  <Image source={source} style={styles.characterImage} />
                </View>
              ))}
            </View>

            <View style={styles.form}>
              <View style={styles.field}>
                <Text style={styles.label}>IDENTIFICADOR</Text>
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="usuario"
                  placeholderTextColor="#2A2A3F"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>CÓDIGO DE ACCESO</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••••"
                  placeholderTextColor="#2A2A3F"
                  secureTextEntry
                />
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.loginBtn,
                  pressed && { opacity: 0.8 },
                ]}
                onPress={handleLogin}
                disabled={loading}
              >
                <LinearGradient
                  colors={
                    loading
                      ? ["#2A2A3F", "#2A2A3F"]
                      : ["#C1121F", "#6B0F1A"]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.loginBtnGradient}
                >
                  <Text style={styles.loginBtnText}>
                    {loading ? "VERIFICANDO..." : "INICIAR SESIÓN"}
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>

            <Text style={styles.hint}>
              Solo personal autorizado del gobierno.{"\n"}
              Las intrusiones serán investigadas.
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050508" },

  content: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
    gap: 24,
  },

  header: {
    alignItems: "center",
    gap: 8,
  },

  headerLabel: {
    fontFamily: "ShareTechMono-Regular",
    fontSize: 10,
    color: "#C1121F",
    letterSpacing: 3,
  },

  headerTitle: {
    fontFamily: "BentonSans-Bold",
    fontSize: 27,
    color: "#E8E8F0",
    letterSpacing: 3,
    textAlign: "center",
  },

  headerSub: {
    fontFamily: "ShareTechMono-Regular",
    fontSize: 11,
    color: "#7B7B9A",
    letterSpacing: 1,
    textAlign: "center",
  },

  charactersRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  characterFrame: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1.5,
    borderColor: "#C1121F",
    backgroundColor: "#12121A",
    overflow: "hidden",
    shadowColor: "#C1121F",
    shadowOpacity: 0.45,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },

  characterImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  form: {
    gap: 16,
    backgroundColor: "#12121A",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2A2A3F",
    padding: 20,
  },

  field: { gap: 6 },

  label: {
    fontFamily: "ShareTechMono-Regular",
    fontSize: 10,
    color: "#7B7B9A",
    letterSpacing: 2,
  },

  input: {
    backgroundColor: "#0A0A0F",
    borderWidth: 1,
    borderColor: "#2A2A3F",
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#E8E8F0",
    fontFamily: "Montserrat-Regular",
    fontSize: 15,
  },

  loginBtn: {
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 8,
  },

  loginBtnGradient: {
    paddingVertical: 15,
    alignItems: "center",
  },

  loginBtnText: {
    fontFamily: "BentonSans-Bold",
    fontSize: 13,
    color: "#E8E8F0",
    letterSpacing: 3,
  },

  hint: {
    fontFamily: "ShareTechMono-Regular",
    fontSize: 10,
    color: "#2A2A3F",
    textAlign: "center",
    letterSpacing: 1,
    lineHeight: 16,
  },
});