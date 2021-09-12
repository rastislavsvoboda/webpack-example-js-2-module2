import axios from "axios";

export default function useBankService() {
  const API_URL = "http://localhost:3212";

  async function getBanks() {
    const url = `${API_URL}/bank/`;
    let result = await axios.get(url);
    return result.data;
  }

  async function getBank(id) {
    const url = `${API_URL}/bank/${id}`;
    let result = await axios.get(url);
    return result.data;
  }

  return {
    getBanks,
    getBank,
  };
}
