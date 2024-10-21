export type Logger = {
  info: <T>(message: string, obj?: T) => void;
  error: <T>(error: Error, obj?: T) => void;
  debug: <T>(message: string, obj?: T) => void;
  warn: <T>(message: string, obj?: T) => void;
};
