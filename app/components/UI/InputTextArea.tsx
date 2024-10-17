import { forwardRef, useId } from "react";
import { FieldError } from "react-hook-form";
import { twJoin } from "tailwind-merge";
import { InputFieldError } from "../UI/InputFieldError";

type InputTextAreaProps = React.ComponentPropsWithoutRef<"textarea"> & {
  children: string;
  error?: FieldError;
};
export const InputTextArea: React.FC<InputTextAreaProps> = forwardRef<
  HTMLTextAreaElement,
  InputTextAreaProps
>(function InputTextArea(
  {
    onChange,
    onBlur,
    name,
    children,
    error,
    readOnly,
    defaultValue,
    autoFocus,
  },
  ref,
) {
  const id = useId();

  return (
    <div className="mb-4">
      <label htmlFor={id}>{children}</label>
      <textarea
        id={id}
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="off"
        readOnly={readOnly}
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        className={twJoin(
          "w-full h-20 rounded-md bg-primary",
          error && "border-red-500 border",
        )}
      />
      <InputFieldError error={error} />
    </div>
  );
});
