import { forwardRef, useId } from "react";
import { FieldError } from "react-hook-form";
import { twJoin } from "tailwind-merge";
import { InputFieldError } from "../UI/InputFieldError";

type InputFieldProps = {
  children: string;
  type?: InputFieldType;
  error?: FieldError;
} & React.ComponentPropsWithoutRef<"input">;

export enum InputFieldType {
  Text = "text",
  Date = "date",
  Time = "time",
}
/**
 * Componente `InputField` que representa un campo de entrada de formulario.
 *
 * Este componente acepta un texto como etiqueta, un tipo de entrada, y opcionalmente
 * puede recibir un error de validación para mostrar un mensaje de error.
 *
 * @param {InputFieldProps} props - Propiedades del componente.
 * @param {React.Ref<HTMLInputElement>} ref - Referencia al elemento de entrada.
 * @returns {JSX.Element} Un campo de entrada con etiqueta y posible mensaje de error.
 */
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    {
      onChange,
      onBlur,
      name,
      children,
      type,
      error,
      readOnly,
      defaultValue,
      autoFocus,
    }: InputFieldProps,
    ref,
  ) {
    const id = useId();

    return (
      <div className="mb-4">
        <label htmlFor={id}>{children}</label>
        <input
          id={id}
          name={name}
          type={type}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="off"
          readOnly={readOnly}
          defaultValue={defaultValue}
          autoFocus={autoFocus}
          className={twJoin(
            "w-full h-10 rounded-md bg-primary px-4",
            error && "border-red-500 border",
          )}
        />
        <InputFieldError error={error} />
      </div>
    );
  },
);
