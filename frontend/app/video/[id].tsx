import { View } from "react-native";
import { WebView } from "react-native-webview";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import api from "../../api/client";

export default function VideoPlayer() {
  const { id, token } = useLocalSearchParams();
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    api
      .get(`/video/${id}/stream?token=${token}`)
      .then((res) => setUrl(res.data.stream_url));
  }, []);

  if (!url) return null;

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: url }} />
    </View>
  );
}
