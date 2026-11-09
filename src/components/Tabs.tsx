export type TabItem = { id: string; label: string; color: string };

export function Tabs({ items, value, onChange, label }: {
  items: TabItem[]; value: string; onChange: (id: string) => void; label: string;
}) {
  return (
    <div className="tabs" role="group" aria-label={label}>
      {items.map((t) => (
        <button
          key={t.id}
          type="button"
          className="tab"
          aria-pressed={value === t.id}
          onClick={() => onChange(t.id)}
          style={value === t.id ? { background: t.color } : undefined}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
