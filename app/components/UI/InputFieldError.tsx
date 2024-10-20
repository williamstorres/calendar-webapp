import { FieldError } from "react-hook-form";

type InputFieldErrorProps = {
  error?: FieldError;
};
/**
 * Componente `InputFieldError` que muestra un mensaje de error asociado a un campo de entrada.
 *
 * Este componente recibe un objeto de error y, si existe, muestra el mensaje de error
 * en un estilo de texto rojo.
 *
 * @param {InputFieldErrorProps} props - Propiedades del componente.
 * @returns {JSX.Element} Un elemento que muestra el mensaje de error si está presente.
 */
export const InputFieldError: React.FC<InputFieldErrorProps> = ({
  error,
}: InputFieldErrorProps): JSX.Element => {
  return (
    <div className="w-full h-4">
      <span data-testid="error" className="text-xs text-red-500 w-full">
        {error && error.message}
      </span>
    </div>
  );
};
