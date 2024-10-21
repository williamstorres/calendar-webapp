import axios from "axios";
import { CalendarEventType } from "../types/CalendarEvent";
import { CancelableRequest, handleCancelable } from "../libs/utils";

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST}api`,
});

export const getMonthlyEvents = (
  date: Date,
): CancelableRequest<Record<string, CalendarEventType[]>> => {
  return handleCancelable((signal) =>
    API.get(`/events?month=${date.getMonth()}&year=${date.getFullYear()}`, {
      signal,
    }).then((response) => {
      return response.data;
    }),
  );
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
