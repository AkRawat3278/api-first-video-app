


import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import api from "../api/client";
import { removeToken } from "../storage/auth";

export default function Settings() {
  const [user, setUser] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    api.get("/auth/me").then((res) => setUser(res.data));
  }, []);

  const logout = async () => {
    await removeToken();
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },
  email: {
    fontSize: 16,
    color: "#64748B",
    marginBottom: 30,
  },
  logout: {
    backgroundColor: "#EF4444",
    padding: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
