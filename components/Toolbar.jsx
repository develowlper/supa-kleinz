import { supabase } from 'lib/initSupabase';
import { RiLockLine } from 'react-icons/ri';
import Button from './Button';

export default function Toolbar() {
  return (
    <div className="bg-fuchsia-200 flex justify-between px-4 py-2">
      <h1 className="text-xl uppercase">Supa Kleinz</h1>
      <ul>
        <li>
          <Button
            className="flex gap-2 items-center"
            onClick={async () => {
              await supabase.auth.signOut();
            }}
          >
            {'Signout'}
            <RiLockLine />
          </Button>
        </li>
      </ul>
    </div>
  );
}
