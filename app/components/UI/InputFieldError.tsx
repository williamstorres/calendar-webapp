import { FieldError } from "react-hook-form";

type InputFieldErrorProps = {
  error?: FieldError;
};
export const InputFieldError: React.FC<InputFieldErrorProps> = ({ error }) => {
  return (
    <div className="w-full h-4">
      <span className="text-xs text-red-500 w-full">
        {error && error.message}
      </span>
    </div>
  );
};
