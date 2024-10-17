import { useId, forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { InputFieldError } from "./InputFieldError";
import { twJoin } from "tailwind-merge";

export type AutocompleteOption = {
  text: string;
};
type AutocompleteProps<T extends AutocompleteOption> =
  React.ComponentPropsWithoutRef<"input"> & {
    name: string;
    children: string;
    setValue: (value: T) => void;
    error?: FieldError;
    options: T[];
  };

export const Autocomplete = forwardRef<
  HTMLInputElement,
  AutocompleteProps<AutocompleteOption>
>(function Autocomplete(
  { children, name, setValue, error, options, onChange, onBlur },
  ref,
) {
  const id = useId();

  return (
    <div className="relative w-full max-w-sm mb-4">
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        autoComplete="off"
        type="text"
        className={twJoin(
          "w-full px-4 py-2 bg-primary rounded-md focus:outline-none focus:ring focus:ring-blue-300",
          error && "border-red-500 border",
        )}
      />
      {options && options.length > 0 && (
        <ul className="absolute z-10 w-full bg-primary border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto px-4">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => setValue(option)}
            >
              {option.text}
            </li>
          ))}
        </ul>
      )}
      <InputFieldError error={error} />
    </div>
  );
});
