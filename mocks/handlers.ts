import { http, HttpResponse } from "msw";
import { nanoid } from "nanoid";

export const handlers = [
  http.get("http://localhost:3000/api/events", () => {
    const eventStartDate = new Date();
    eventStartDate.setHours(10);
    const eventEndDate = new Date();
    eventEndDate.setHours(10);

    return HttpResponse.json({
      "20241012": [
        {
          id: nanoid(),
          title: "prueba",
          description: "esto es un evento de prueba",
          startDateTime: eventStartDate.toISOString(),
          endDateTime: eventEndDate.toISOString(),
          isAllDay: false,
          color: "#2563eb",
        },
      ],
    });
  }),
];
