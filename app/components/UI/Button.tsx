import React from "react";
import { twMerge } from "tailwind-merge";

export enum ButtonType {
  Submit = "submit",
  Reset = "reset",
}
type ButtonProps = React.ComponentPropsWithoutRef<"input"> & {
  children: string;
  type?: ButtonType;
  onClick?: () => void;
};
/**
 * Componente `Button` que representa un botón estilizado.
 *
 * Este componente acepta un texto como hijos y opcionalmente puede recibir un
 * tipo de botón, un manejador de clics y clases adicionales para el estilo.
 *
 * @param {ButtonProps} props - Propiedades del componente.
 * @returns {JSX.Element} Un botón HTML que ejecuta la función `onClick` cuando es presionado.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  type,
  onClick,
  className,
  disabled,
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={twMerge("h-8 disabled:text-opacity-50", className)}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
