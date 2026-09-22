export function SectionHeading({
  eyebrow,
  children,
  id,
}: {
  eyebrow: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{children}</h2>
    </div>
  );
}
