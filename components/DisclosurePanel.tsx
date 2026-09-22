export function DisclosurePanel({
  open,
  id,
  labelId,
  className = "",
  children,
}: {
  open: boolean;
  id: string;
  labelId?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className="disclosure-panel"
      data-open={open}
      aria-hidden={!open}
      inert={!open}
      role={labelId ? "region" : undefined}
      aria-labelledby={labelId}
    >
      <div className="disclosure-clip">
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}
