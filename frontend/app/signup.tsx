

import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import api from "../api/client";

export default function Signup() {
  const router = useRouter();
  let name = "";
  let email = "";
  let password = "";

  const signup = async () => {
    await api.post("/auth/signup", { name, email, password });
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account 🚀</Text>

      <TextInput placeholder="Name" onChangeText={(v) => (name = v)} style={styles.input} />
      <TextInput placeholder="Email" onChangeText={(v) => (email = v)} style={styles.input} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={(v) => (password = v)}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={signup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
