

import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import api from "../api/client";

export default function Dashboard() {
  const [videos, setVideos] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    api.get("/dashboard").then((res) => setVideos(res.data));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Featured Videos</Text>

      {videos.map((v) => (
        <TouchableOpacity
          key={v.id}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/video/[id]",
              params: { id: v.id, token: v.playback_token },
            })
          }
        >
          <Image source={{ uri: v.thumbnail }} style={styles.thumbnail} />
          <View style={styles.cardBody}>
            <Text style={styles.title}>{v.title}</Text>
            <Text style={styles.description}>{v.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#0F172A",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 3,
  },
  thumbnail: {
    height: 200,
    width: "100%",
  },
  cardBody: {
    padding: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#0F172A",
  },
  description: {
    fontSize: 14,
    color: "#64748B",
  },
});
