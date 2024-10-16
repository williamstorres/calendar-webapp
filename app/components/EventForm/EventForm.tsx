import React, { useEffect } from "react";
import InputField from "../Field";
import { InputFieldType } from "../Field/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ButtonType } from "../Button/Button";
import { eventFormSchema, FormFields } from "./eventFormSchema";
import { useSaveEventForm } from "@/app/hooks/useSaveEventForm";
import { addHours, format, setMinutes } from "date-fns";
import { getTime } from "@/app/libs/date";
import { useStore } from "@/app/store/storeContext";

export const EventForm = () => {
  const store = useStore();
  console.log("render modal");
  const initialDate = setMinutes(addHours(new Date(), 1), 0);

  const defaultValues = store.selectedEvent
    ? {
        ...store.selectedEvent,
        startTime: getTime(store.selectedEvent.startDateTime),
        endTime: getTime(store.selectedEvent.endDateTime),
      }
    : {
        startTime: getTime(initialDate),
        endTime: getTime(addHours(initialDate, 1)),
      };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormFields>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(eventFormSchema),
    defaultValues,
  });
  const handleSave = useSaveEventForm(store.saveEvent);

  const isAllDay = watch("isAllDay");

  useEffect(() => {
    if (isAllDay) {
      setValue("startTime", "00:00");
      setValue("endTime", "23:59");
    } else {
      setValue("startTime", defaultValues.startTime);
      setValue("endTime", defaultValues.endTime);
    }
  }, [isAllDay, setValue, defaultValues.startTime, defaultValues.endTime]);

  return (
    <div className="w-screen h-[90%] p-8 bg-background  fixed bottom-0 rounded-t-3xl shadow-[0px_-8px_10px_0px_#1a202c]">
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="grid grid-cols-2 mt-0 w-full mb-8 items-center">
          <Button
            onClick={() =>
              (store.showEventForm = false && store.cleanSelectedEvent())
            }
            className="text-red-500 justify-self-start"
          >
            Cancelar
          </Button>
          <Button
            type={ButtonType.Submit}
            className="text-red-500 justify-self-end"
            disabled={!isValid}
          >
            Guardar
          </Button>
        </div>
        <InputField autoFocus {...register("title")} error={errors.title}>
          Titulo
        </InputField>
        <InputField {...register("location")} error={errors.location}>
          Ubicación
        </InputField>
        <InputField {...register("description")}>Description</InputField>
        <InputField
          type={InputFieldType.Date}
          {...register("date")}
          error={errors.date}
          defaultValue={format(
            store.selectedEvent
              ? store.selectedEvent.startDateTime
              : initialDate,
            "yyyy-MM-dd",
          )}
        >
          Fecha
        </InputField>
        <InputField type={InputFieldType.Checkbox} {...register("isAllDay")}>
          Todo el día?
        </InputField>
        <div className="flex w-full place-content-between">
          <InputField
            type={InputFieldType.Time}
            {...register("startTime")}
            error={errors.startTime}
            defaultValue={isAllDay ? "00:00" : undefined}
            readOnly={isAllDay}
          >
            Hora de inicio
          </InputField>
          <InputField
            type={InputFieldType.Time}
            {...register("endTime")}
            error={errors.endTime}
            disabled={isAllDay}
          >
            Hora de termino
          </InputField>
        </div>
      </form>
    </div>
  );
};
