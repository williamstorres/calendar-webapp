type InputFieldGroupProps = {
  children: React.ReactNode;
};
export const InputFieldGroup: React.FC<InputFieldGroupProps> = ({
  children,
}) => {
  return <div className="grid grid-cols-2 gap-4">{children}</div>;
};
