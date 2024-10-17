type LoadingProps = {
  loading: boolean;
};
export const Loading: React.FC<LoadingProps> = ({ loading }) => {
  return (
    <div className="w-full h-[2px] bg-background relative overflow-hidden">
      {loading && (
        <div className="absolute w-full h-full bg-red-500 animate-slide"></div>
      )}
    </div>
  );
};
