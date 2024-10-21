type InputFieldGroupProps = {
  children: React.ReactNode;
};
/**
 * Componente InputFieldGroup que agrupa campos de entrada en un diseño de cuadrícula.
 *
 * @param {InputFieldGroupProps} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - Los elementos hijos que se agrupan dentro del componente.
 * @returns {JSX.Element} El componente InputFieldGroup renderizado, mostrando los campos de entrada en una cuadrícula.
 */
export const InputFieldGroup: React.FC<InputFieldGroupProps> = ({
  children,
}: InputFieldGroupProps): JSX.Element => {
  return <div className="grid grid-cols-2 gap-4">{children}</div>;
};
