import axios from "axios";

export default function useHealthService() {
  const API_URL = "http://localhost:3211";

  async function getHealths() {
    const url = `${API_URL}/health/`;
    let result = await axios.get(url);
    return result.data;
  }

  async function getHealth(id) {
    const url = `${API_URL}/health/${id}`;
    let result = await axios.get(url);
    return result.data;
  }

  return {
    getHealths,
    getHealth,
  };
}
