import { CheckIcon } from './Button';
import { Diya } from './Diya';

export function StepList({ steps, ticked, onToggle, highlightCurrent }: {
  steps: string[]; ticked: number[]; onToggle: (i: number) => void; highlightCurrent?: boolean;
}) {
  const current = highlightCurrent ? steps.findIndex((_, i) => !ticked.includes(i)) : -1;
  return (
    <ul className="stack" style={{ listStyle: 'none', margin: 0, padding: 0, gap: 10 }}>
      {steps.map((s, i) => {
        const on = ticked.includes(i);
        return (
          <li key={i}>
            <button
              type="button"
              className={`step${i === current ? ' current' : ''}`}
              aria-pressed={on}
              onClick={() => onToggle(i)}
            >
              <span className="step-n" aria-hidden="true">{on ? <CheckIcon size={18} /> : i + 1}</span>
              <span className="step-text">{s}</span>
              {i === current && <Diya lit size={34} />}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
