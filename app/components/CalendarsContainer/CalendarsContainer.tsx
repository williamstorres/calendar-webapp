type CalendarsContainerProps<T> = {
  items: T[];
  children(item: T): JSX.Element;
};
/**
 * Componente `CalendarsContainer` que renderiza una lista de elementos utilizando
 * la función `children` proporcionada.
 *
 * Este componente toma un array de elementos y una función que se utiliza para
 * renderizar cada uno de esos elementos.
 *
 * @template T - Tipo de los elementos en el array `items`.
 * @param {CalendarsContainerProps<T>} props - Las propiedades del componente.
 * @returns {JSX.Element} El contenedor que incluye los elementos renderizados.
 */
export const CalendarsContainer = <T,>({
  children,
  items,
}: CalendarsContainerProps<T>): JSX.Element => {
  const childrens = items.map((item) => children(item));

  return <div>{childrens}</div>;
};
