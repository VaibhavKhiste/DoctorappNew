// screens/DashboardScreen.js
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const DashboardScreen = ({ route }) => {
  const { username } = route.params || { username: "User" };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Hello,</Text>
          <Text style={styles.username}>{username}</Text>
        </View>
        <View style={styles.headerRight}>
          <Ionicons name="notifications-outline" size={28} color="black" style={{ marginRight: 15 }} />
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/847/847969.png" }}
            style={styles.avatar}
          />
        </View>
      </View>

      {/* Search Bar */}
      <TextInput
        placeholder="Search..."
        style={styles.searchBar}
        placeholderTextColor="#999"
      />

      {/* Quote Card */}
      <View style={styles.quoteCard}>
        <Text style={styles.quoteText}>
          Stay safe, stay healthy. {"\n"}An apple a day keeps doctor away 🍎
        </Text>
        <View style={styles.doctorImages}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png" }}
            style={styles.doctorIcon}
          />
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/921/921071.png" }}
            style={styles.doctorIcon}
          />
        </View>
      </View>

      {/* Grid of Options */}
      <View style={styles.grid}>
        <IconButton name="qr-code-outline" label="Scan" />
        <IconButton name="syringe" type="FontAwesome5" label="Vaccine" />
        <IconButton name="local-hospital" type="MaterialIcons" label="My Booking" />
        <IconButton name="medkit-outline" label="Clinic" />
        <IconButton name="ambulance" type="FontAwesome5" label="Ambulance" />
        <IconButton name="user-nurse" type="FontAwesome5" label="Nurse" />
      </View>
    </View>
  );
};

// Custom Icon Button
const IconButton = ({ name, type = "Ionicons", label }) => {
  const [pressed, setPressed] = React.useState(false);
  const Icon = type === "Ionicons" ? Ionicons : type === "FontAwesome5" ? FontAwesome5 : MaterialIcons;

  return (
    <TouchableOpacity
      style={[styles.iconButton, { backgroundColor: pressed ? "#FF7F50" : "white" }]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <Icon name={name} size={26} color={pressed ? "white" : "#333"} />
      <Text style={[styles.iconLabel, { color: pressed ? "white" : "#333" }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hello: {
    fontSize: 16,
    color: "#555",
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchBar: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 10,
    marginVertical: 15,
    fontSize: 16,
    elevation: 2,
  },
  quoteCard: {
    backgroundColor: "#007BFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },
  quoteText: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
  doctorImages: {
    flexDirection: "row",
  },
  doctorIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  iconButton: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    elevation: 3,
  },
  iconLabel: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default DashboardScreen;
