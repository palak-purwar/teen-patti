import { useApp } from '../state';
import { tr } from '../data/copy';
import { Button } from '../components/Button';
import { href } from '../router';

export function NotFound() {
  const { lang } = useApp();
  return (
    <main className="screen center" style={{ justifyContent: 'center', gap: 16 }}>
      <p>{tr('notFound', lang)}</p>
      <Button href={href('/start')}>{tr('home', lang)}</Button>
    </main>
  );
}
