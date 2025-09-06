// src/screens/DoctorDetailScreen.js
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getDoctorById } from "../api/api";

export default function DoctorDetailScreen({ route }) {
  const { guid } = route.params;
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    loadDoctor();
  }, []);

  const loadDoctor = async () => {
    try {
      const data = await getDoctorById(guid);
      setDoctor(data);
    } catch (err) {
      console.error("Error fetching doctor:", err);
    }
  };

  if (!doctor) return <Text style={{ padding: 20 }}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{doctor.Name}</Text>
      <Text>Email: {doctor.Email}</Text>
      <Text>Gender: {doctor.Gender}</Text>
      <Text>Practicing From: {doctor.PracticingFrom}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});
