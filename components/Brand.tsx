export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 110"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 8h48c23 0 38 15 38 35S79 77 56 77H39v17H23v16H0V88h15V72h16V56h25V33H8Z" />
    </svg>
  );
}
export function Brand({ className = "" }: { className?: string }) {
  return (
    <span className={`passo-brand ${className}`} role="img" aria-label="PASSO">
      <Monogram />
      <span aria-hidden="true">ASSO.</span>
    </span>
  );
}
