import { forwardRef, useId } from "react";

type SwitchProps = {
  children: string;
} & React.ComponentPropsWithoutRef<"input">;
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { children, defaultValue, onChange, name }: SwitchProps,
  ref,
) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className="relative flex justify-between items-center group p-2 text-xl"
    >
      {children}
      <input
        id={id}
        name={name}
        type="checkbox"
        defaultValue={defaultValue}
        onChange={onChange}
        ref={ref}
        className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
      />
      <span className="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-primary rounded-full duration-300 ease-in-out peer-checked:bg-blue-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
    </label>
  );
});
