import Head from 'components/Head';
import { NavLink } from 'components/Navigation';

export default function Lists() {
  return (
    <div>
      <Head title="lists" />
      <div>
        <h2>Lists:</h2>
        <div className="flex gap-2">
          <NavLink href="/lists/todo" label="Todo" />
          <NavLink href="/lists/tobuy" label="Tobuy" />
        </div>
      </div>
    </div>
  );
}
