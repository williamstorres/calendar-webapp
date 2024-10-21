type LoadingProps = {
  loading: boolean;
};
/**
 * Componente `Loading` que muestra un indicador visual de carga.
 *
 * Este componente muestra una barra que se anima cuando la propiedad `loading` es verdadera.
 *
 * @param {LoadingProps} props - Propiedades del componente.
 * @returns {JSX.Element} Un elemento que representa el indicador de carga.
 */
export const Loading: React.FC<LoadingProps> = ({
  loading,
}: LoadingProps): JSX.Element => {
  return (
    <div className="w-full h-[2px] bg-background relative overflow-hidden">
      {loading && (
        <div className="absolute w-full h-full bg-red-500 animate-slide"></div>
      )}
    </div>
  );
};
