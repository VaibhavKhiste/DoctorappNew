import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-gesture-handler";
import "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createStackNavigator();

/* -------------------- Basic Details Screen -------------------- */
function BasicDetails({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(null);
  const [months, setMonths] = useState("");
  const [years, setYears] = useState("");

  const selectGender = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleNext = () => {
    navigation.navigate("Dashboard", { username: fullName || "User" });
  };

  return (
    <View style={styles.container}>
      {/* Step Progress */}
      <View style={styles.progressBarContainer}>
        <View
          style={[styles.progressBarStep, { flex: 2, backgroundColor: "#D48836" }]}
        />
        <View
          style={[styles.progressBarStep, { flex: 2, backgroundColor: "#E8E8E8" }]}
        />
      </View>
      <Text style={styles.stepText}>2/4</Text>

      {/* Title & Subtitle */}
      <Text style={styles.title}>Basic Details</Text>
      <Text style={styles.subtitle}>Feel free to fill your details</Text>

      {/* Form Inputs */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.label}>Email ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Email ID"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.genderContainer}>
        {["Male", "Female", "Others"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.genderButton,
              gender === item && styles.genderButtonSelected,
            ]}
            onPress={() => selectGender(item)}
          >
            <Text
              style={[
                styles.genderText,
                gender === item && styles.genderTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Practicing From</Text>
      <View style={styles.practicingContainer}>
        <TextInput
          style={[styles.input, styles.practicingInput]}
          placeholder="Months"
          keyboardType="numeric"
          value={months}
          onChangeText={setMonths}
        />
        <TextInput
          style={[styles.input, styles.practicingInput]}
          placeholder="Years"
          keyboardType="numeric"
          value={years}
          onChangeText={setYears}
        />
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

/* -------------------- Dashboard Screen -------------------- */
function Dashboard({ route }) {
  const { username } = route.params || { username: "User" };
  const [active, setActive] = useState(null);

  const features = [
    { name: "Scan", icon: "qrcode-scan" },
    { name: "Vaccine", icon: "needle" },
    { name: "My Booking", icon: "hospital-building" },
    { name: "Clinic", icon: "office-building" },
    { name: "Ambulance", icon: "ambulance" },
    { name: "Nurse", icon: "account-nurse" },
  ];

  return (
    <View style={dashboardStyles.container}>
      {/* Header */}
      <View style={dashboardStyles.header}>
        <Text style={dashboardStyles.greeting}>Hello {username}</Text>
        <View style={dashboardStyles.headerRight}>
          <Icon name="bell-outline" size={26} color="#000" />
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            style={dashboardStyles.avatar}
          />
        </View>
      </View>

      {/* Search Bar */}
      <View style={dashboardStyles.searchBar}>
        <Icon name="magnify" size={22} color="#888" style={{ marginRight: 6 }} />
        <TextInput placeholder="Search" style={{ flex: 1 }} />
      </View>

      {/* Quote Card */}
      <View style={dashboardStyles.quoteCard}>
        <View style={{ flex: 1 }}>
          <Text style={dashboardStyles.quoteText}>
            Stay safe, stay healthy{"\n"}An apple a day keeps the doctor away
          </Text>
        </View>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/387/387561.png",
          }}
          style={dashboardStyles.docImage}
        />
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/387/387561.png",
          }}
          style={dashboardStyles.docImage}
        />
      </View>

      {/* Features Grid */}
      <View style={dashboardStyles.grid}>
        {features.map((item, index) => {
          const isActive = active === item.name;
          return (
            <TouchableOpacity
              key={index}
              style={[
                dashboardStyles.gridItem,
                isActive && { backgroundColor: "#FF8C42" },
              ]}
              onPress={() => setActive(item.name)}
            >
              <Icon
                name={item.icon}
                size={30}
                color={isActive ? "#fff" : "#6A7DE2"}
              />
              <Text
                style={[
                  dashboardStyles.gridText,
                  isActive && { color: "#fff" },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

/* -------------------- App Root -------------------- */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BasicDetails" component={BasicDetails} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* -------------------- Styles -------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  progressBarContainer: {
    flexDirection: "row",
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarStep: {
    marginRight: 4,
  },
  stepText: {
    marginTop: 6,
    alignSelf: "center",
    fontSize: 16,
    color: "#000",
  },
  title: {
    marginTop: 18,
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#7E7E7E",
  },
  label: {
    marginTop: 22,
    fontSize: 14,
    color: "#000",
  },
  input: {
    marginTop: 6,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#000",
  },
  genderContainer: {
    flexDirection: "row",
    marginTop: 6,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#D48836",
    justifyContent: "center",
    alignItems: "center",
  },
  genderButtonSelected: {
    backgroundColor: "#D48836",
  },
  genderText: {
    color: "#D48836",
    fontSize: 14,
  },
  genderTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  practicingContainer: {
    flexDirection: "row",
    marginTop: 6,
  },
  practicingInput: {
    flex: 1,
    marginRight: 10,
  },
  nextButton: {
    marginTop: 40,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#6A7DE2",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#6A7DE2",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  nextButtonText: {
    fontSize: 28,
    color: "#6A7DE2",
  },
});

const dashboardStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  greeting: { fontSize: 20, fontWeight: "600", color: "#000" },
  headerRight: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 35, height: 35, borderRadius: 20, marginLeft: 12 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 3,
    marginBottom: 20,
    height: 42,
  },
  quoteCard: {
    backgroundColor: "#6A7DE2",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  quoteText: { color: "#fff", fontSize: 14, fontWeight: "500" },
  docImage: { width: 45, height: 45, marginLeft: 8 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  gridItem: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  gridText: { marginTop: 6, color: "#6A7DE2", fontSize: 12, fontWeight: "500" },
});
