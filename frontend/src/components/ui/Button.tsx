export const Button = ({
  onClick,
  children,
  className,
  disabled,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-2 py-2 text-2xl bg-green-500  text-white font-bold rounded disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
};
