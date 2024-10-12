import axios from "axios";

const baseUrl = "http://localhost:3000/api";
export const getMonthlyEvents = async (date: Date) => {
  return axios
    .get(`${baseUrl}/events?month=${date.getMonth()}&${date.getFullYear()}`)
    .then((response) => response.data);
};
