// src/screens/RegistrationScreen.js
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { registerDoctor } from "../api/api";

export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(null);
  const [years, setYears] = useState("");

  const handleRegister = async () => {
    if (!fullName || !email || !gender) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const payload = {
      Name: fullName,
      NameUpper: fullName.toUpperCase(),
      PhoneNo: "9876543210", // can be input later
      WhatsappNo: "9876543210",
      CountryCode: "IN",
      Email: email,
      Gender: gender.charAt(0), // "M", "F", "O"
      Age: years || "0",
      AgeUnit: "Y",
    };

    try {
      const res = await registerDoctor(payload);
      console.log("Registration Success:", res);
      Alert.alert("Success", "Doctor Registered Successfully!");
      navigation.navigate("List");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Registration Failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctor Registration</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email ID"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <View style={styles.genderRow}>
        {["Male", "Female", "Others"].map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.genderBtn, gender === g && styles.genderSelected]}
            onPress={() => setGender(g)}
          >
            <Text
              style={[
                styles.genderText,
                gender === g && styles.genderTextSelected,
              ]}
            >
              {g}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Years of Practice"
        value={years}
        onChangeText={setYears}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.btn} onPress={handleRegister}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  genderRow: { flexDirection: "row", marginBottom: 15 },
  genderBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#007bff",
    padding: 10,
    alignItems: "center",
    marginRight: 8,
    borderRadius: 6,
  },
  genderSelected: { backgroundColor: "#007bff" },
  genderText: { color: "#007bff" },
  genderTextSelected: { color: "#fff", fontWeight: "bold" },
  btn: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
