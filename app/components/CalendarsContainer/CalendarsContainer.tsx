type CalendarsContainerProps<T> = {
  items: T[];
  children(item: T): JSX.Element;
};
export const CalendarsContainer = <T,>({
  children,
  items,
}: CalendarsContainerProps<T>) => {
  const childrens = items.map((item) => children(item));

  return <div>{childrens}</div>;
};
