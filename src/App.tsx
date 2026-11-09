import { useRoute } from './router';
import { FairyLights } from './components/FairyLights';
import { Start } from './screens/Start';
import { Choose } from './screens/Choose';
import { Rules } from './screens/Rules';
import { Round } from './screens/Round';

export function App() {
  const route = useRoute();
  return (
    <div className="app">
      <FairyLights />
      {route.name === 'start' && <Start />}
      {route.name === 'choose' && <Choose />}
      {route.name === 'rules' && <Rules id={route.id} />}
      {route.name === 'round' && <Round id={route.id} />}
    </div>
  );
}
