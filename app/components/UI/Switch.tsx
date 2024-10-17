import { forwardRef, useId } from "react";

type SwitchProps = React.ComponentPropsWithoutRef<"input"> & {
  children: string;
};

/**
 * Componente `Switch` que representa un interruptor de tipo checkbox.
 *
 * Este componente permite al usuario alternar un valor booleano.
 * El `Switch` está diseñado para ser accesible y estilizado con Tailwind CSS.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.children - El texto que se muestra junto al interruptor.
 * @param {string} [props.defaultValue] - El valor predeterminado del interruptor.
 * @param {function} [props.onChange] - Función que se llama cuando el estado del interruptor cambia.
 * @param {string} [props.name] - El nombre del interruptor, utilizado para identificarlo en formularios.
 * @param {React.Ref} ref - Referencia al elemento input.
 *
 * @returns {JSX.Element} Un elemento que representa el interruptor.
 */
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
      <span className="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-primary rounded-full duration-300 ease-in-out peer-checked:bg-blue-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6"></span>
    </label>
  );
});
