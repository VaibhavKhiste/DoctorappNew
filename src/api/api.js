import axios from "axios";

// ⚠️ Replace with your system IP from ipconfig (no spaces!)
const BASE_URL = "http://192.168.71.1:5000/api/Doctor"; 

// POST - Register Doctor
export const registerDoctor = async (doctorData) => {
  try {
    const response = await axios.post(`${BASE_URL}/Registration`, doctorData);
    return response.data;
  } catch (error) {
    console.error("Error registering doctor:", error.message);
    throw error;
  }
};

// GET - List Doctors
export const getDoctors = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/List`);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors:", error.message);
    throw error;
  }
};
