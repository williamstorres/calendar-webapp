import axios from "axios";
import { Location } from "../api/domain/entities/CalendarEvent";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
export const getLocations = async (query: string): Promise<Location[]> => {
  return API.get(`/locations?query=${query}`).then((response) => response.data);
};
