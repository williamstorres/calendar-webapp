import axios from "axios";
import { CalendarEventType } from "../types/CalendarEvent";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
export const getMonthlyEvents = async (date: Date) => {
  return API.get(
    `/events?month=${date.getMonth()}&year=${date.getFullYear()}`,
  ).then((response) => response.data);
};

export const addNewEvent = async (newEvent: CalendarEventType) => {
  return API.post(`/events`, newEvent).then((response) => response.data);
};

export const updateEvent = async (event: CalendarEventType) => {
  return API.put(`/events?id=${event.id}`, event).then(
    (response) => response.data,
  );
};

export const deleteEvent = async (id: string) => {
  return API.delete(`/events?id=${id}`);
};
