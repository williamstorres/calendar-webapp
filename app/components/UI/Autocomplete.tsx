import { useId, forwardRef, useState, useEffect } from "react";
import { FieldError } from "react-hook-form";
import { InputFieldError } from "./InputFieldError";
import { twJoin } from "tailwind-merge";
import { useDebounce } from "@/app/hooks/useDebounce";

type AutocompleteProps = React.ComponentPropsWithoutRef<"input"> & {
  name: string;
  children: string;
  setValue: (value: unknown) => void;
  error?: FieldError;
  fetchOptions: (query: string) => Promise<unknown[]>;
  renderOption: (value: unknown) => React.ReactNode;
};
export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  function Autocomplete(
    { children, name, setValue, error, fetchOptions, onBlur, renderOption },
    ref,
  ) {
    const id = useId();

    const [debouncedQuery, setDebouncedQuery] = useDebounce("");
    const [options, setOptions] = useState<unknown[]>();

    useEffect(() => {
      if (debouncedQuery && debouncedQuery.length > 0)
        fetchOptions(debouncedQuery).then((options) => setOptions(options));
    }, [debouncedQuery, fetchOptions]);

    const handleClick = (option: unknown) => {
      setOptions([]);
      setValue(option);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDebouncedQuery(event.target.value);
    };

    return (
      <div className="relative w-full mb-4">
        <label htmlFor={id}>{children}</label>
        <input
          id={id}
          name={name}
          onChange={handleChange}
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
                data-testid={`location-${index}`}
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleClick(option)}
              >
                {renderOption(option)}
              </li>
            ))}
          </ul>
        )}
        <InputFieldError error={error} />
      </div>
    );
  },
);
